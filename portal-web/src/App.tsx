import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"

import {
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
} from "@material-ui/core/styles"
import { Route } from "react-router-dom"

// Our Libs
import "./styles/core-styles.scss"
import { Loading, Header, Footer, ErrorAlert } from "./components/shared"
import { AppRoutes } from "./AppRoutes"
import { useApp } from "./useApp.hook"

const theme = createMuiTheme({
  typography: {
    fontFamily: ["HelveticaNeue", "Roboto", "Arial"].join(","),
  },
})

const App = () => {
  const {
    isInitializing,
    isAuthenticated,
    loginWithRedirect,
    apolloLink,
    alerts,
    setAlerts,
    alertsOpen,
    setAlertsOpen,
  } = useApp()

  if (isInitializing) {
    return <Loading />
  }

  if (!isAuthenticated) {
    loginWithRedirect({})
  }

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloLink}>
          <>
            <div className="content">
              <Route
                path="/"
                render={({ location }) => (
                  <>
                    <Header location={location} />
                    {alerts.length > 0 &&
                      alertsOpen &&
                      alerts.map(
                        ({ message, severity, orgId, requestId, errors }) => (
                          <ErrorAlert
                            message={message}
                            severity={severity}
                            orgId={orgId}
                            requestId={requestId}
                            errors={errors}
                            onClose={() => setAlertsOpen(false)}
                          />
                        ),
                      )}
                    <AppRoutes setAlerts={setAlerts} />
                  </>
                )}
              />
            </div>
            <Footer />
          </>
        </ApolloProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
