import React, { FunctionComponent } from "react"
import { Alert } from "@material-ui/lab"
import { Snackbar } from "@material-ui/core"

type ErrorProps = {
  message: string
  severity: "error" | "warning" | "info" | "success"
  orgId?: string
  requestId?: string
  errors?: string[]
  onClose?: () => void
}

export const ErrorAlert: FunctionComponent<ErrorProps> = React.memo(
  ({ message, severity, requestId, orgId, errors, onClose }) => {
    const vertical = "top"
    const horizontal = "center"

    return (
      <Snackbar open anchorOrigin={{ vertical, horizontal }}>
        <Alert severity={severity} onClose={onClose}>
          {message}
          {errors && errors.map(error => <p>{error}</p>)}
          {requestId}
          {orgId}
        </Alert>
      </Snackbar>
    )
  },
)
