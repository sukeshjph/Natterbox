/* eslint-disable no-console */
import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import { Auth0Provider } from "./plugins/auth0"
import history from "./plugins/history"

const onAuthRedirectCallback = (redirectResult?: RedirectLoginResult) => {
  console.log(
    "auth0 onRedirectCallback called with redirectState %o",
    redirectResult,
  )

  const targetUrl =
    redirectResult &&
    redirectResult.appState &&
    redirectResult.appState.targetUrl
      ? redirectResult.appState.targetUrl
      : window.location.pathname

  history.push(targetUrl)
}

render(
  <Auth0Provider
    redirect_uri={window.location.origin}
    onRedirectCallback={onAuthRedirectCallback}>
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root"),
)
