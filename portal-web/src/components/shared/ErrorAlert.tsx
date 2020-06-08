import React, { FunctionComponent } from "react"
import { Alert } from "@material-ui/lab"

type ErrorProps = {
  message: string
  severity: "error" | "warning" | "info" | "success"
}

export const ErrorAlert: FunctionComponent<ErrorProps> = React.memo(
  ({ message, severity }) => {
    return <Alert severity={severity}>{message}</Alert>
  },
)
