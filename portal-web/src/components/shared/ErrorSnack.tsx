import React, { FunctionComponent } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@mdi/react"
import { mdiCloseCircleOutline } from "@mdi/js"

type ErrorProps = {
  error: string
  open: boolean
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
        autoHideDuration={6000}
        message={error}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}>
              <Icon path={mdiCloseCircleOutline} size={1} horizontal vertical />
            </IconButton>
          </>
        }
      />
    )
  },
)
