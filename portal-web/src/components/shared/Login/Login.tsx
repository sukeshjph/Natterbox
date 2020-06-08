import React from "react"
import IconButton from "@material-ui/core/IconButton"
import { mdiLogout } from "@mdi/js"
import Icon from "@mdi/react"
import { ApolloConsumer } from "@apollo/react-hooks"
import { useAuth0 } from "../../../plugins/auth0"

export const Login = () => {
  const { isAuthenticated, logout } = useAuth0()

  return (
    <ApolloConsumer>
      {client => {
        return (
          <div>
            {isAuthenticated && (
              <IconButton
                onClick={() => {
                  client.resetStore()
                  logout()
                }}>
                <Icon
                  path={mdiLogout}
                  size={1}
                  horizontal
                  color="white"
                  rotate={180}
                />
              </IconButton>
            )}
          </div>
        )
      }}
    </ApolloConsumer>
  )
}
