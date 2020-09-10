import React, { useEffect, useReducer } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { omit } from "ramda"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import FormGroup from "@material-ui/core/FormGroup"
import InputLabel from "@material-ui/core/InputLabel"
import { Loading, ErrorSnack } from "../../../../../shared"
import styles from "../../../../Users.module.scss"
import { GET_USER_DETAILS, UPDATE_USER } from "../../../../UserQueries"
import { setUserDetailsUpdateState } from "../../../../UserActions"
import {
  userDetailsReducer,
  userDetailsUpdateState,
} from "../../UserUpdateReducer"

type OwnProps = {
  userId: number
}

export const GeneralSettingsUpdate: React.FC<OwnProps> = ({
  userId,
}: OwnProps) => {
  const [errorSnack, setErrorSnack] = React.useState(false)
  const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: { userId },
  })
  const [state, dispatch] = useReducer(
    userDetailsReducer,
    userDetailsUpdateState,
  )

  const [updateUser, { loading: updatingUser }] = useMutation(UPDATE_USER, {
    onCompleted(usrData) {
      dispatch(setUserDetailsUpdateState(usrData.updateUser))
    },
  })

  useEffect(() => {
    if (data && data.user) {
      dispatch(
        setUserDetailsUpdateState(omit(["__typename", "userId"], data.user)),
      )
    }
  }, [data])

  if (loading) return <Loading />
  if (error)
    return (
      <ErrorSnack
        error={error!.message}
        open={error! && !errorSnack}
        handleClose={() => setErrorSnack(true)}
      />
    )

  const updateField = (fieldType: string) => e => {
    const userObj = omit(["__typename", "userId"], data.user)

    if (fieldType === "enabled") {
      dispatch(
        setUserDetailsUpdateState({
          ...userObj,
          enabled: e.target.value === "Active",
        }),
      )
    } else {
      dispatch(
        setUserDetailsUpdateState({
          ...userObj,
          [fieldType]: e.target.value,
        }),
      )
    }
  }

  const user: IUser = data && data.user ? data.user : {}

  const {
    firstName,
    middleNames,
    lastName,
    sipExtension,
    enabled,
    primaryMobileNumber,
    userName,
    permissionLevel,
  } = state.user

  const onSubmitHandler = () => {
    updateUser({
      variables: {
        id: user.userId,
        user: {
          ...omit(["__typename", "userId"], state),
        },
      },
    })
  }

  const resetForm = () => dispatch(setUserDetailsUpdateState(data.user))

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
            className={styles.formControl}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              className: styles.textControl,
            }}
            onChange={updateField("lastName")}
          />
          <TextField
            id="primaryMobileNumber"
            label="Primary Mobile"
            value={primaryMobileNumber}
            margin="normal"
            className={styles.formControl}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              className: styles.textControl,
            }}
            onChange={updateField("primaryMobileNumber")}
          />
          <TextField
            id="userName"
            label="Login Name"
            value={userName}
            margin="normal"
            className={styles.formControl}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              className: styles.textControl,
            }}
            onChange={updateField("userName")}
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
          <div className={styles.headerButtonPanel}>
            <Button
              type="button"
              onClick={resetForm}
              disabled={updatingUser}
              className={styles.userRevertChanges}>
              REVERT CHANGES
            </Button>
            <Button
              type="submit"
              disabled={updatingUser}
              className={styles.formButton}>
              {updatingUser ? "Updating User" : "Save Changes"}
            </Button>
          </div>
        </div>
      </FormGroup>
    </ValidatorForm>
  )
}
