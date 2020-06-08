import React, { useEffect } from "react"
import { Switch, useLocation } from "react-router-dom"
import { PrivateRoute } from "./components/shared"
import {
  LogsLazy,
  AccountsLazy,
  UsersLazy,
  NumbersLazy,
  DevicesLazy,
  MeLazy,
  GroupsLazy,
} from "./pages"

export const AppRoutes = ({ setAlert }) => {
  const location = useLocation()
  useEffect(() => {
    // reset any error alerts on page change
    setAlert({
      show: false,
      message: "",
      severity: "error",
    })
  }, [location])

  return (
    <Switch>
      <PrivateRoute exact path="/" render={() => <div>Home</div>} />
      <PrivateRoute exact path="/home" render={() => <div>Home</div>} />
      <PrivateRoute exact path="/logs" component={LogsLazy} />
      <PrivateRoute exact path="/accounts" component={AccountsLazy} />
      <PrivateRoute exact path="/users" component={UsersLazy} />
      <PrivateRoute exact path="/devices" component={DevicesLazy} />
      <PrivateRoute exact path="/numbers" component={NumbersLazy} />
      <PrivateRoute exact path="/policies" render={() => <div>Policies</div>} />
      <PrivateRoute exact path="/groups" component={GroupsLazy} />
      <PrivateRoute exact path="/me" component={MeLazy} />
    </Switch>
  )
}
