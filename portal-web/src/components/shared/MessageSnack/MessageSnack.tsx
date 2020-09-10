import React, { FunctionComponent } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@mdi/react"
import { mdiCloseCircleOutline } from "@mdi/js"
import { messageSnackBarStyles } from "./SnackBarStyles"
import styles from "./Alert.module.scss"

type MessageProps = {
  message: string
  open: boolean
  handleClose?: () => void
}

export const MessageSnack: FunctionComponent<MessageProps> = React.memo(
  ({ message, open, handleClose }) => {
    const snackClasses = messageSnackBarStyles()

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        ContentProps={{
          classes: {
            root: snackClasses.root,
          },
        }}
        open={open}
        autoHideDuration={2000}
        message={message}
        action={
          <>
            <IconButton
              size="small"
              className={styles.messageSnack}
              aria-label="close"
              onClick={handleClose}>
              <Icon path={mdiCloseCircleOutline} size={1} horizontal vertical />
            </IconButton>
          </>
        }
      />
    )
  },
)
