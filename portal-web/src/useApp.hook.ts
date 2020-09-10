import { useState, useEffect } from "react"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink, Observable } from "apollo-link"
import { RetryLink } from "apollo-link-retry"

import { useHistory } from "react-router-dom"

import { useAuth0 } from "./plugins/auth0"

type AlertProps = {
  message: string
  severity: "error" | "warning" | "info" | "success"
  orgId?: string
  requestId?: string
  errors?: string[]
}

type alertsProps = AlertProps[]

export const useApp = () => {
  const [alerts, setAlerts] = useState<alertsProps>([])
  const [alertsOpen, setAlertsOpen] = useState(true)

  const {
    isInitializing,
    isAuthenticated,
    loginWithRedirect,
    userToken,
    apiUrl,
  } = useAuth0()

  useEffect(() => {
    setAlerts([])
  }, [])

  const history = useHistory()

  const request = operation => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${userToken}` || "",
      },
    })
  }

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) handle.unsubscribe()
        }
      }),
  )

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 5,
      retryIf: error => !!error,
    },
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      if (graphQLErrors.length === 1) {
        setAlerts([
          {
            message: graphQLErrors[0].message,
            severity: "error",
          },
        ])
        history.push({
          pathname: "/error",
          state: { graphQLErrors },
        })
      } else {
        history.push({
          pathname: "/error",
          state: { graphQLErrors },
        })
      }
    }

    if (networkError) {
      setAlerts([
        {
          message: networkError.message,
          severity: "error",
        },
      ])
      history.push({
        pathname: "/error",
        state: { networkError },
      })
    }
  })

  const apolloLink = new ApolloClient({
    link: ApolloLink.from([
      retryLink,
      errorLink,
      requestLink,
      new HttpLink({
        uri: apiUrl,
      }),
    ]),
    cache: new InMemoryCache(),
  })

  apolloLink.defaultOptions = {
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  }

  return {
    isInitializing,
    isAuthenticated,
    loginWithRedirect,
    apolloLink,
    alerts,
    setAlerts,
    alertsOpen,
    setAlertsOpen,
  }
}
