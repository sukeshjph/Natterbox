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
import styles from "./UserUpdate.module.scss"

import { UserGeneralSettingsUpdate } from "./UserGeneralSettingsUpdate"
import { Voicemail } from "./components/Voicemail/Voicemail"
import { LocaleSettings } from "./components/LocaleSettings/LocaleSettings"

type OwnProps = {
  user: Pick<
    IUser,
    "userId" | "userName" | "firstName" | "lastName" | "middleNames"
  >
  showDialog: boolean
  closeDialog: () => void
  refetch: () => void
}

export const UserUpdate = ({
  closeDialog,
  showDialog,
  user,
  refetch,
}: OwnProps) => {
  const [form, setForm] = React.useState("generalSettingsUpdate")

  const { userId, userName } = user

  const userFullName = `${(user || {}).firstName || ""} ${(user || {})
    .middleNames || ""} ${(user || {}).lastName || ""}`

  const handleChange = event => setForm(event.target.value)

  return (
    <Paper>
      <Dialog
        open={showDialog}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={() => closeDialog()}
        aria-labelledby="User-Update-Title"
        aria-describedby="User-Update-Title-description">
        <PortalDialogTitle title={userFullName} closeDialog={closeDialog} />
        <DialogContent>
          <DialogContentText id="User-Update-Title-description">
            <div className={styles.userDetailsModal}>
              <span>{`User ID: ${userId || ""} - ${userName || ""}`}</span>
              <FormControl
                className={`${styles.userSettingsSelect} ${styles.compactSelect}`}>
                <Select
                  labelId="settings-select"
                  id="settings-select-id"
                  value={form}
                  className={styles.settingsDropdown}
                  onChange={handleChange}>
                  <MenuItem value="generalSettingsUpdate">General</MenuItem>
                  <MenuItem value="voicemailUpdate">Voicemail</MenuItem>
                  <MenuItem value="localeSettingsUpdate">
                    Locale Settings
                  </MenuItem>
                </Select>
              </FormControl>
              {
                {
                  localeSettingsUpdate: <LocaleSettings userId={userId} />,
                  generalSettingsUpdate: (
                    <UserGeneralSettingsUpdate
                      userId={userId}
                      refetchUsers={refetch}
                      closeDialog={closeDialog}
                    />
                  ),
                  voicemailUpdate: <Voicemail userId={userId} />,
                }[form]
              }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </Paper>
  )
}
