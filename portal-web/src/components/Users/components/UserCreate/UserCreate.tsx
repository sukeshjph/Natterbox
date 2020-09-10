/* eslint-disable react/no-string-refs */
import React from "react"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import FormGroup from "@material-ui/core/FormGroup"
import InputLabel from "@material-ui/core/InputLabel"
import Button from "@material-ui/core/Button"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import useUserCreateHook from "./useUserCreateHook"

import { PortalDialogTitle } from "../../../shared"

import styles from "./UserCreate.module.scss"

type OwnProps = {
  closeDialog: () => void
  refreshData: () => void
}

export const UserCreate: React.FC<OwnProps> = ({
  closeDialog,
  refreshData,
}) => {
  const {
    creatingUser,
    state,
    updateField,
    onSubmitHandler,
    handleUserAdd,
  } = useUserCreateHook({ closeDialog, refreshData })

  const {
    firstName,
    middleNames,
    lastName,
    sipExtension,
    enabled,
    primaryMobileNumber,
    userName,
    permissionLevel,
  } = state

  let form

  return (
    <Paper>
      <Dialog
        open
        onClose={closeDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md">
        <PortalDialogTitle title="Add User" closeDialog={closeDialog} />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <ValidatorForm
              onSubmit={onSubmitHandler}
              ref={input => {
                form = input
              }}
              autoComplete="off"
              className={styles.formValidator}>
              <FormGroup>
                <div id="userCreate">
                  <TextValidator
                    InputLabelProps={{ shrink: true }}
                    className={styles.formControl}
                    name="firstName"
                    label="First Name"
                    onChange={updateField("firstName")}
                    value={firstName}
                    InputProps={{
                      className: styles.textControl,
                    }}
                    validators={["required"]}
                    errorMessages={["First Name is required"]}
                  />
                  <TextValidator
                    InputLabelProps={{ shrink: true }}
                    className={styles.formControl}
                    name="middleNames"
                    label="Middle Name"
                    onChange={updateField("middleNames")}
                    value={middleNames}
                    InputProps={{
                      className: styles.textControl,
                    }}
                    validators={["required"]}
                    errorMessages={["Middle Name is required"]}
                  />
                  <TextValidator
                    InputLabelProps={{ shrink: true }}
                    className={styles.formControl}
                    name="lastName"
                    label="Last Name"
                    onChange={updateField("lastName")}
                    value={lastName}
                    InputProps={{
                      className: styles.textControl,
                    }}
                    validators={["required"]}
                    errorMessages={["Last Name is required"]}
                  />

                  <TextValidator
                    InputLabelProps={{ shrink: true }}
                    className={styles.formControl}
                    name="userName"
                    label="Login Name"
                    onChange={updateField("userName")}
                    value={userName}
                    InputProps={{
                      className: styles.textControl,
                    }}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "Login Name is required",
                      "Login Name is not valid email",
                    ]}
                  />

                  <TextValidator
                    InputLabelProps={{ shrink: true }}
                    className={styles.formControl}
                    name="primaryMobileNumber"
                    label="Primary Mobile"
                    onChange={updateField("primaryMobileNumber")}
                    value={primaryMobileNumber}
                    InputProps={{
                      className: styles.textControl,
                    }}
                    validators={["required", "isValidPhoneNumber"]}
                    errorMessages={[
                      "Primary Mobile is required",
                      "Mobile number is not valid",
                    ]}
                  />

                  <TextValidator
                    InputLabelProps={{ shrink: true }}
                    className={styles.formControl}
                    name="sipExtension"
                    label="Extension"
                    onChange={updateField("sipExtension")}
                    value={sipExtension}
                    InputProps={{
                      className: styles.textControl,
                    }}
                    validators={[
                      "minNumber:2000",
                      "maxNumber:7999",
                      "isNumber",
                    ]}
                    errorMessages={[
                      "Number must be above 2000.",
                      "Number must be below 7999.",
                      "Must contain only numerical characters.",
                    ]}
                  />

                  <FormControl
                    className={`${styles.formControl} ${styles.userSettingsSelect}`}>
                    <InputLabel id="userPermissions-select" shrink>
                      User Permission
                    </InputLabel>
                    <Select
                      labelId="userPermissions-select"
                      id="userPermissions-select-id"
                      label="User Permission"
                      value={permissionLevel}
                      className={styles.settingsDropdown}
                      onChange={updateField("permissionLevel")}>
                      <MenuItem value="BASIC">BASIC</MenuItem>
                      <MenuItem value="ADMINISTRATOR">ADMINISTRATOR</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    className={`${styles.formControl} ${styles.userSettingsSelect}`}>
                    <InputLabel id="loginStatus-select" shrink>
                      Login Status
                    </InputLabel>
                    <Select
                      labelId="loginStatus-select"
                      label="Login Status"
                      className={styles.settingsDropdown}
                      id="loginStatus-select-id"
                      value={enabled ? "Active" : "In Active"}
                      onChange={updateField("enabled")}>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="In Active">In Active</MenuItem>
                    </Select>
                  </FormControl>
                  <div className={styles.createButtonPanel}>
                    <Button
                      type="button"
                      onClick={closeDialog}
                      disabled={creatingUser}
                      className={styles.cancelUserCreateButton}>
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      disabled={creatingUser}
                      data-testid="SaveCreateButton"
                      className={styles.formButton}
                      onClick={() => {
                        handleUserAdd("SaveCreate")
                        form.submit()
                      }}>
                      Save and Create another
                    </Button>
                    <Button
                      type="button"
                      disabled={creatingUser}
                      className={styles.formButton}
                      onClick={() => {
                        handleUserAdd("SaveClose")
                        form.submit()
                      }}>
                      Save and Close
                    </Button>
                  </div>
                </div>
              </FormGroup>
            </ValidatorForm>
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </Paper>
  )
}
