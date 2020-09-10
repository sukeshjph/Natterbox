import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Button from "@material-ui/core/Button"
import { PortalDialogTitle } from "components/shared"

type ownProps = {
  closeDialog: () => void
  showDeleteDialog: boolean
  handleDeleteSound: (choice: string) => () => void
}

export const DeleteDialog = ({
  closeDialog,
  showDeleteDialog,
  handleDeleteSound,
}: ownProps) => {
  return (
    <Dialog
      open={showDeleteDialog}
      onClose={closeDialog}
      aria-labelledby="Delete dialog"
      aria-describedby="Delete dialog">
      <PortalDialogTitle title="Delete Sound" closeDialog={closeDialog} />
      <DialogContent>
        <DialogContentText id="Delete dialog-description">
          Are you sure you want to delete sound
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteSound("Disagree")} color="primary">
          Disagree
        </Button>
        <Button onClick={handleDeleteSound("Agree")} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
