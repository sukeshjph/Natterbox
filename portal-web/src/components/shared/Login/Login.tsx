import React from "react"
import IconButton from "@material-ui/core/IconButton"
import { ApolloConsumer } from "@apollo/react-hooks"
import { useAuth0 } from "../../../plugins/auth0"
import styles from "./Login.module.scss"
import { LogoutIcon } from "../Images"

export const Login = () => {
  const { isAuthenticated, logout } = useAuth0()

  return (
    <ApolloConsumer>
      {client => {
        return (
          <div>
            {isAuthenticated && (
              <IconButton
                className={styles.buttonGrey}
                onClick={() => {
                  client.resetStore()
                  logout()
                }}>
                <LogoutIcon />
                Logout
              </IconButton>
            )}
          </div>
        )
      }}
    </ApolloConsumer>
  )
}
