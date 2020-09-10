import React from "react"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import FormGroup from "@material-ui/core/FormGroup"
import InputLabel from "@material-ui/core/InputLabel"
import { Autocomplete } from "@material-ui/lab"

import { Loading, ErrorSnack } from "components/shared"
import styles from "./UserUpdate.module.scss"
import useUserGeneralSettingsUpdateHook from "./useUserGeneralSettingsUpdateHook"
import { UserDeleteDialog } from "./UserDeleteDialog"

type OwnProps = {
  userId: number
  refetchUsers: () => void
  closeDialog: () => void
}

export const UserGeneralSettingsUpdate: React.FC<OwnProps> = ({
  userId,
  refetchUsers,
  closeDialog,
}) => {
  const {
    updatingUser,
    userLoading,
    userLoadingError,
    updateField,
    onSubmitHandler,
    updateDevicesCache,
    errorSnack,
    setErrorSnack,
    resetForm,
    handleDeleteUser,
    handleDeleteClick,
    deletingUser,
    deleteDialog,
    state,
    handleDeleteDialog,
    currentUserId,
  } = useUserGeneralSettingsUpdateHook({ userId, refetchUsers, closeDialog })

  const { devices, user, devicesCache } = state
  const {
    firstName,
    middleNames,
    lastName,
    sipExtension,
    enabled,
    primaryMobileNumber,
    userName,
    permissionLevel,
  } = user

  if (userLoading) return <Loading />
  if (userLoadingError)
    return (
      <ErrorSnack
        error={userLoadingError!.message}
        open={userLoadingError! && !errorSnack}
        handleClose={() => setErrorSnack(true)}
      />
    )

  const formDisabled = deletingUser || updatingUser

  return (
    <ValidatorForm
      onSubmit={onSubmitHandler}
      autoComplete="off"
      className={styles.formValidator}>
      <FormGroup>
        <span className={styles.userDetailsSectionTitles}>My Account</span>
        <div id="details">
          <TextField
            id="firstName"
            label="First Name"
            margin="normal"
            className={styles.formControl}
            value={firstName}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={formDisabled}
            InputProps={{
              className: styles.textControl,
            }}
            onChange={updateField("firstName")}
          />
          <TextField
            id="middleNames"
            label="Middle Name"
            value={middleNames}
            margin="normal"
            className={styles.formControl}
            disabled={formDisabled}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              className: styles.textControl,
            }}
            onChange={updateField("middleNames")}
          />
          <TextField
            id="lastName"
            label="Last Name"
            value={lastName}
            margin="normal"
            disabled={formDisabled}
            className={styles.formControl}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              className: styles.textControl,
            }}
            onChange={updateField("lastName")}
          />

          <Autocomplete
            multiple
            id="tags-standard"
            options={devices}
            getOptionLabel={option => {
              if (option && option.sipExtension) return option.sipExtension
              return ""
            }}
            getOptionSelected={(option, value) => {
              return option.sipExtension === value.sipExtension
            }}
            onChange={(e, val) => {
              updateDevicesCache(val)
            }}
            value={devicesCache}
            renderInput={params => (
              <TextField {...params} variant="standard" label="Sip Devices" />
            )}
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
            id="userName"
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
            name="sipExtension"
            label="Extension"
            disabled={formDisabled}
            onChange={updateField("sipExtension")}
            value={sipExtension}
            InputProps={{
              className: styles.textControl,
            }}
            validators={[
              "required",
              "minNumber:2000",
              "maxNumber:7999",
              "isNumber",
            ]}
            errorMessages={[
              "This field is required.",
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
              disabled={formDisabled}
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
              disabled={formDisabled}
              id="loginStatus-select-id"
              value={enabled ? "Active" : "In Active"}
              onChange={updateField("enabled")}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="In Active">In Active</MenuItem>
            </Select>
          </FormControl>
          <div className={styles.updateButtonPanel}>
            <Button
              type="button"
              onClick={resetForm}
              disabled={formDisabled}
              className={styles.userRevertChanges}>
              REVERT CHANGES
            </Button>
            <Button
              type="submit"
              disabled={formDisabled}
              className={styles.formButton}>
              {updatingUser ? "Updating User" : "Save Changes"}
            </Button>
            <Button
              type="button"
              onClick={handleDeleteClick}
              disabled={
                deletingUser || updatingUser || currentUserId === userId
              }
              className={styles.formButton}>
              {deletingUser ? "Deleting User" : "Delete User"}
            </Button>
            <UserDeleteDialog
              open={deleteDialog}
              onClose={() => handleDeleteDialog(false)}
              handleDisagree={handleDeleteUser("Disagree")}
              handleAgree={handleDeleteUser("Agree")}
            />
          </div>
        </div>
      </FormGroup>
    </ValidatorForm>
  )
}
