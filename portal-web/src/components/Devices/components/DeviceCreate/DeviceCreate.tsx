import React from "react"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import GeneralSettingsCreate from "./GeneralSettingsCreate"
import { PortalDialogTitle } from "../../../shared"

type OwnProps = {
  closeDialog: () => void
  refreshData: () => void
}

export const DeviceCreate = ({ closeDialog, refreshData }: OwnProps) => {
  return (
    <Paper>
      <Dialog
        open
        onClose={closeDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md">
        <PortalDialogTitle
          title="Create a new Device"
          closeDialog={closeDialog}
        />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <GeneralSettingsCreate refreshData={refreshData} />
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </Paper>
  )
}
