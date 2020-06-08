import React from "react"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { PortalDialogTitle } from "../../../shared"
import styles from "../Device.module.scss"

import GeneralSettingsUpdate from "./GeneralSettingsUpdate"
import SecuritySettingsUpdate from "./SecuritySettingsUpdate"

type OwnProps = {
  closeDialog: () => void
  id: string
}

export const DeviceUpdate = ({ closeDialog, id }: OwnProps) => {
  const [form, setForm] = React.useState("generalSettingsUpdate")

  const handleChange = event => {
    setForm(event.target.value)
  }

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
          title="View/Update Device"
          closeDialog={closeDialog}
        />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <>
              <FormControl>
                <Select
                  labelId="device-text"
                  id="device-edit-Type"
                  value={form}
                  className={styles.settingsDropdown}
                  onChange={handleChange}>
                  <MenuItem value="generalSettingsUpdate">
                    General Settings
                  </MenuItem>
                  <MenuItem value="securitySettings">
                    Security Settings
                  </MenuItem>
                </Select>
              </FormControl>
              {
                {
                  generalSettingsUpdate: <GeneralSettingsUpdate id={id} />,
                  securitySettings: <SecuritySettingsUpdate id={id} />,
                }[form]
              }
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </Paper>
  )
}
