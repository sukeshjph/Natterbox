import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Button from "@material-ui/core/Button"
import { mdiAlertCircle } from "@mdi/js"
import Icon from "@mdi/react"
import { PortalDialogTitle } from "components/shared"
import styles from "./UserUpdate.module.scss"

type OwnProps = {
  open: boolean
  onClose: () => void
  handleDisagree: () => void
  handleAgree: () => void
}

export const UserDeleteDialog: React.FC<OwnProps> = ({
  open,
  onClose,
  handleDisagree,
  handleAgree,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="Delete dialog"
      aria-describedby="Delete dialog">
      <PortalDialogTitle title="Confirmation" closeDialog={onClose} />
      <DialogContent>
        <DialogContentText id="Delete dialog-description">
          <div className={styles.deleteHeaderMessage}>
            <Icon
              path={mdiAlertCircle}
              size={1}
              horizontal
              vertical
              color="Red"
            />
            Please confirm you want to delete this user
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleAgree}
          color="primary"
          className={styles.deleteUnSelectedButton}>
          Yes, delete.
        </Button>
        <Button
          onClick={handleDisagree}
          color="primary"
          autoFocus
          className={styles.formButton}>
          No, cancel.
        </Button>
      </DialogActions>
    </Dialog>
  )
}
