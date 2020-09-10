import Loadable from "react-loadable"
import RouteLoading from "./AsyncRouteLoading"

export const LogsLazy = Loadable({
  loader: () => import(/* webpackChunkName: 'Logs' */ "./logs/LogsPage"),
  loading: RouteLoading,
  delay: 500,
})

export const AccountsLazy = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Accounts' */ "./accountSettings/AccountsPage"),
  loading: RouteLoading,
  delay: 500,
})

export const UsersLazy = Loadable({
  loader: () => import(/* webpackChunkName: 'Users' */ "./users/UsersPage"),
  loading: RouteLoading,
  delay: 500,
})

export const DevicesLazy = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Devices' */ "./devices/DevicesPage"),
  loading: RouteLoading,
  delay: 500,
})

export const NumbersLazy = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Numbers' */ "./numbers/NumbersPage"),
  loading: RouteLoading,
  delay: 500,
})

export const MeLazy = Loadable({
  loader: () => import(/* webpackChunkName: 'Me' */ "./me/MePage"),
  loading: RouteLoading,
  delay: 500,
})

export const GroupsLazy = Loadable({
  loader: () => import(/* webpackChunkName: 'Groups' */ "./groups/GroupsPage"),
  loading: RouteLoading,
  delay: 500,
})

export const ErrorLazy = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Error' */ "./errorHandler/ErrorPage"),
  loading: RouteLoading,
  delay: 500,
})

export const PoliciesLazy = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Policies' */ "./policies/PoliciesPage"),
  loading: RouteLoading,
  delay: 500,
})
