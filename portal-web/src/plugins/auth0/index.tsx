/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from "react"
import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"

export interface Auth0RedirectState {
  targetUrl?: string
}

export interface Auth0User extends Omit<IdToken, "__raw"> {}

interface Auth0Context {
  user?: Auth0User
  userToken?: string
  isAuthenticated: boolean
  isInitializing: boolean
  isPopupOpen: boolean
  apiUrl: string
  sapienUrl: string
  loginWithPopup(o?: PopupLoginOptions): Promise<void>
  handleRedirectCallback(): Promise<RedirectLoginResult>
  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>
  loginWithRedirect(o?: RedirectLoginOptions): Promise<void>
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>
  logout(o?: LogoutOptions): void
}
interface Auth0ProviderOptions {
  children: React.ReactElement
  onRedirectCallback(result: RedirectLoginResult): void
}

export const Auth0Context = React.createContext<Auth0Context | null>(null)
export const useAuth0 = () => useContext(Auth0Context)!

const getAppendedSapienUrl = url => {
  if (!url.includes("v1")) {
    return url.slice(url.length - 1) === "/" ? `${url}v1/` : `${url}/v1/`
  }
  return url
}

const getConfigResponse = async () => {
  if (process.env.NODE_ENV === "development") {
    return {
      graphqlUrl: process.env.REACT_APP_API_URL,
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      client_id: process.env.REACT_APP_AUTH0_CLIENTID,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      sapien_url: process.env.REACT_APP_SAPIEN_URL,
    }
  }

  let response
  try {
    response = await fetch(`${window.location.origin}/config`)
  } catch (error) {
    throw new Error(
      `Failed to fetch config: Status:${response.status}, message:${error.message}`,
    )
  }

  const configData = await response.json()
  const { authDomain, clientId, sapienUrl, ...others } = configData

  return {
    ...others,
    domain: authDomain,
    client_id: clientId,
    sapien_url: getAppendedSapienUrl(sapienUrl),
  }
}

export const Auth0Provider = ({
  children,
  onRedirectCallback,
  ...initOptions
}: Auth0ProviderOptions & Pick<Auth0ClientOptions, "redirect_uri">) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [user, setUser] = useState<Auth0User>()
  const [userToken, setUserToken] = useState<"">()
  const [auth0Client, setAuth0Client] = useState<Auth0Client>()
  const [apiUrl, setApiUrl] = useState("")
  const [sapienUrl, setSapienUrl] = useState("")

  useEffect(() => {
    const initAuth0 = async () => {
      const {
        audience,
        domain,
        client_id,
        graphqlUrl,
        sapien_url,
      } = await getConfigResponse()

      const auth0FromHook = await createAuth0Client({
        ...initOptions,
        domain,
        client_id,
        audience,
      })

      setAuth0Client(auth0FromHook)
      setApiUrl(graphqlUrl)
      setSapienUrl(sapien_url)

      if (window.location.search.includes("code=")) {
        let appState: RedirectLoginResult = {}
        try {
          ;({ appState } = await auth0FromHook.handleRedirectCallback())
        } finally {
          onRedirectCallback(appState)
        }
      }

      const authed = await auth0FromHook.isAuthenticated()

      if (authed) {
        const userProfile = await auth0FromHook.getUser()
        const token = await auth0FromHook.getTokenSilently()

        setIsAuthenticated(true)
        setUser(userProfile)
        setUserToken(token)
      }

      setIsInitializing(false)
    }

    initAuth0()
  }, [])

  const loginWithPopup = async (options?: PopupLoginOptions) => {
    setIsPopupOpen(true)

    try {
      await auth0Client!.loginWithPopup(options)
    } catch (error) {
      console.error(error) //eslint-disable-line
    } finally {
      setIsPopupOpen(false)
    }

    const userProfile = await auth0Client!.getUser()
    setUser(userProfile)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setIsInitializing(true)

    const result = await auth0Client!.handleRedirectCallback()
    const userProfile = await auth0Client!.getUser()

    setIsInitializing(false)
    setIsAuthenticated(true)
    setUser(userProfile)

    return result
  }

  const loginWithRedirect = (options?: RedirectLoginOptions) =>
    auth0Client!.loginWithRedirect(options)

  const getTokenSilently = (options?: GetTokenSilentlyOptions) =>
    auth0Client!.getTokenSilently(options)

  const logout = (options?: LogoutOptions) => auth0Client!.logout(options)

  const getIdTokenClaims = (options?: getIdTokenClaimsOptions) =>
    auth0Client!.getIdTokenClaims(options)

  const getTokenWithPopup = (options?: GetTokenWithPopupOptions) =>
    auth0Client!.getTokenWithPopup(options)

  return (
    <Auth0Context.Provider
      value={{
        user,
        isAuthenticated,
        isInitializing,
        isPopupOpen,
        userToken,
        loginWithPopup,
        loginWithRedirect,
        logout,
        getTokenSilently,
        handleRedirectCallback,
        getIdTokenClaims,
        getTokenWithPopup,
        apiUrl,
        sapienUrl,
      }}>
      {children}
    </Auth0Context.Provider>
  )
}
