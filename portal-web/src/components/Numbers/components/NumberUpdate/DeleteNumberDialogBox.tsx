import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import { PortalDialogTitle } from "../../../shared"

export default function DeleteNumberDialogBox(props: any) {
  const {
    showDeleteConfirmDialog,
    dismissDeleteConfirmDialog,
    handleDeleteNumber,
    showMessageDialog,
    handleCloseMessageDialog,
    deleteSuccessMessage,
  } = props

  return (
    <>
      <Dialog
        open={showDeleteConfirmDialog}
        onClose={dismissDeleteConfirmDialog}
        aria-labelledby="Delete dialog" // what is this
        aria-describedby="Delete dialog">
        <PortalDialogTitle
          title="Delete User"
          closeDialog={dismissDeleteConfirmDialog}
        />
        <DialogContent>
          <DialogContentText id="Delete dialog-description">
            Are you sure you want to delete number
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dismissDeleteConfirmDialog} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDeleteNumber} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showMessageDialog}
        aria-labelledby="Delete dialog"
        aria-describedby="Delete dialog">
        <PortalDialogTitle
          title="Message"
          closeDialog={handleCloseMessageDialog}
        />
        <DialogContent>
          <DialogContentText id="Delete dialog-description">
            {deleteSuccessMessage}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}
