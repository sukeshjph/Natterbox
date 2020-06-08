import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
// import InputLabel from "@material-ui/core/InputLabel"
import FormGroup from "@material-ui/core/FormGroup"
// import Input from "@material-ui/core/Input"
import { Loading, ErrorSnack, PortalDialogTitle } from "../shared"
import { IUser } from "./User.type"
import styles from "./Users.module.scss"
import { UserDetailsColumns } from "./UserColProps"

const GET_USER_DETAILS = gql`
  query GetUserById($userId: ID!) {
    user(id: $userId) {
      userId
      userName
      firstName
      lastName
      sipExtension
      permissionLevel
      primaryMobileNumber
    }
  }
`

type OwnProps = {
  userId: number
  showDialog: boolean
  closeDialog: () => void
}

export const UserDetails: React.FC<OwnProps> = ({
  userId,
  showDialog,
  closeDialog,
}: OwnProps) => {
  const [errorSnack, setErrorSnack] = React.useState(false)
  const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: { userId },
  })

  if (loading) return <Loading />
  if (error)
    return (
      <ErrorSnack
        error={error!.message}
        open={error! && !errorSnack}
        handleClose={() => setErrorSnack(true)}
      />
    )

  const user: IUser = data && data.user ? data.user : {}
  const userFullName = `${(user || {}).firstName || ""} ${(user || {})
    .lastName || ""}`

  return (
    <Paper>
      <Dialog
        open={showDialog}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={() => closeDialog()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <PortalDialogTitle title={userFullName} closeDialog={closeDialog} />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className={styles.userDetailsModal}>
              <FormGroup>
                <span
                  className={
                    styles.userDetailsSectionTitles
                  }>{`User ID: ${user.userId || ""} - ${user.userName ||
                  ""}`}</span>
                <FormControl className={styles.userSettingsSelect}>
                  <Select
                    labelId="settings-select"
                    id="settings-select-id"
                    value="General"
                    className={styles.settingsDropdown}
                    onChange={() => false}>
                    <MenuItem value="General">General</MenuItem>
                  </Select>
                </FormControl>
                <span className={styles.userDetailsSectionTitles}>
                  My Account
                </span>
                <div id="details">
                  {Object.keys(UserDetailsColumns)
                    .filter(userKey => userKey !== "userId")
                    .map(userKey => (
                      <TextField
                        id={userKey}
                        label={UserDetailsColumns[userKey]}
                        defaultValue={user[userKey]}
                        margin="normal"
                        className={styles.formControl}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          className: styles.textControl,
                        }}
                      />
                    ))}
                </div>
                <div id="password">
                  <TextField
                    id="newPin"
                    label="New Pin"
                    margin="normal"
                    className={styles.formControl}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      className: styles.textControl,
                    }}
                  />
                  <TextField
                    id="newPassword"
                    label="New Password"
                    margin="normal"
                    className={styles.formControl}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      className: styles.textControl,
                    }}
                  />
                </div>
              </FormGroup>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </Paper>
  )
}
