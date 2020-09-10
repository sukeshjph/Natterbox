// @ts-nocheck
import React, { useEffect } from "react"
import { Route, withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { useAuth0 } from "../../plugins/auth0"

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const { isInitializing, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (isInitializing || isAuthenticated) {
      return
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path },
      })
    }
    fn()
  }, [isInitializing, isAuthenticated, loginWithRedirect, path])

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
}

export const PrivateRoute = withRouter(ProtectedRoute)
