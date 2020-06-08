import React from "react"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"

type OwnProps = {
  closeDialog: () => void
}

export const NumberCreate = ({ closeDialog }: OwnProps) => {
  return (
    <Paper>
      <Dialog
        open
        onClose={closeDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="md"
      />
    </Paper>
  )
}
