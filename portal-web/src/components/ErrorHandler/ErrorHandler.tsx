import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { prop, uniqBy } from "ramda"
import { useAuth0 } from "../../plugins/auth0"
import { UnknownError } from "./UnknownError"
import { NetworkError } from "./NetworkError"

interface graphQLErrors {
  message: string
  locations: any[]
  path: any[]
  extensions: {
    code: string
    response: {
      url: string
      status: number
      statusText: string
      body: {
        error: {
          code: number
          description: string
          errors: any[]
        }
      }
    }
  }
}

type locationType = {
  pathName?: string
  state: { graphQLErrors?: graphQLErrors[]; networkError?: any }
}

export const ErrorHandler = () => {
  const location: locationType = useLocation()
  const { loginWithRedirect } = useAuth0()

  const [graphQLErrors, setGraphqlErrors] = useState<graphQLErrors[]>([])
  const [networkError, setNetworkError] = useState<any>(null)

  const getGraphqlErrror = () => {
    if (graphQLErrors) {
      const isUnAuthorized = graphQLErrors.some(err => {
        if (err.extensions && err.extensions.code === "UNAUTHENTICATED") {
          return true
        }
        return false
      })

      if (isUnAuthorized) {
        loginWithRedirect({})
      }

      return uniqBy(prop("message"), graphQLErrors)
        .map(err => {
          if (err.extensions && err.extensions.response) {
            return `${err.extensions.code}:${err.extensions.response.body.error.description}`
          }

          return ""
        })
        .filter(val => val)
        .join("")
    }

    return ""
  }

  useEffect(() => {
    if (location.state) {
      if (location.state.graphQLErrors) {
        const isUnAuthorized = graphQLErrors.some(
          err => err.extensions && err.extensions.code === "UNAUTHENTICATED",
        )
        if (isUnAuthorized) {
          loginWithRedirect({})
        }
        setGraphqlErrors(location.state.graphQLErrors)
      }
      if (location.state.networkError) {
        if (networkError !== null && (networkError as ServerError).statusCode) {
          if (
            (networkError as ServerError).statusCode &&
            (networkError as ServerError).statusCode === 401
          ) {
            loginWithRedirect({})
          }
        }
        setNetworkError(location.state.networkError)
      }
    }
  }, [location])

  return (
    <div>
      {getGraphqlErrror && <UnknownError error={getGraphqlErrror()} />}
      {networkError && <NetworkError error={networkError} />}
    </div>
  )
}
