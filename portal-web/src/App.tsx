import React, { useState } from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import {
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
} from "@material-ui/core/styles"
import { BrowserRouter as Router, Route } from "react-router-dom"

// Our Libs
import "./styles/global.scss"
import { useAuth0 } from "./plugins/auth0"
import { Loading, Header, Footer, ErrorAlert } from "./components/shared"
import { AppRoutes } from "./AppRoutes"

const theme = createMuiTheme({
  typography: {
    fontFamily: ["HelveticaNeue", "Roboto", "Arial"].join(","),
  },
})

type alertProps = {
  message: string
  show: boolean
  severity: "error" | "warning" | "info" | "success"
}

const App = () => {
  const {
    isInitializing,
    isAuthenticated,
    loginWithRedirect,
    userToken,
    apiUrl,
  } = useAuth0()

  const [alert, setAlert] = useState<alertProps>({
    message: "",
    show: false,
    severity: "error",
  })

  if (isInitializing) {
    return <Loading />
  }

  if (!isAuthenticated) {
    loginWithRedirect({})
  }

  const apolloLink = new ApolloClient({
    onError: err => {
      if (
        err &&
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].extensions
      )
        setAlert({
          show: true,
          message: `${err.graphQLErrors[0].message}, ${err.graphQLErrors[0].extensions.description}, ${err.graphQLErrors[0].extensions.exception.orgId}, ${err.graphQLErrors[0].extensions.exception.requestId}`,
          severity: "error",
        })
    },
    uri: apiUrl,
    request: operation => {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${userToken}` || "",
        },
      })
    },
  })

  apolloLink.defaultOptions = {
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  }

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloLink}>
          <Router>
            <>
              <div className="content">
                <Route
                  path="/"
                  render={({ location }) => (
                    <>
                      <Header location={location} />
                      {alert.show && (
                        <ErrorAlert
                          message={alert.message}
                          severity={alert.severity}
                        />
                      )}
                      <AppRoutes setAlert={setAlert} />
                    </>
                  )}
                />
              </div>
              <Footer />
            </>
          </Router>
        </ApolloProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
