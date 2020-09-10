import React, { FunctionComponent } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import { Alert } from "@material-ui/lab"

type ErrorProps = {
  error: string
  open: boolean
  severity?: "error" | "warning" | "info" | "success"
  handleClose?: () => void
}

export const ErrorSnack: FunctionComponent<ErrorProps> = React.memo(
  ({ error, open, handleClose }) => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={2000}>
        <Alert severity="error" onClose={handleClose}>
          {error}
        </Alert>
      </Snackbar>
    )
  },
)
