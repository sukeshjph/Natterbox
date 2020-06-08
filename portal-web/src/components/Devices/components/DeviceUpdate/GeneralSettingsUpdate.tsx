import React, { useState, useEffect } from "react"
import { pathOr, isNil } from "ramda"
import { useMutation, useQuery } from "@apollo/react-hooks"
import FormControl from "@material-ui/core/FormControl"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Switch from "@material-ui/core/Switch"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { Loading } from "../../../shared/Loading/Loading"
import { VIEW_DEVICE, UPDATE_DEVICE } from "../DeviceQueries"
import { IDevice } from "../Device.type"
import styles from "../Device.module.scss"

type DeviceState = Pick<
  IDevice,
  "sipExtension" | "description" | "location" | "enabled" | "password"
>

const DeviceInitialState = {
  sipExtension: "",
  description: "",
  location: "",
  enabled: true,
}

type ownProps = {
  id: string
}

const GeneralSettingsUpdate: React.FC<ownProps> = ({ id }) => {
  const { loading, data, refetch } = useQuery(VIEW_DEVICE, {
    variables: { id },
  })

  const [deviceState, setDeviceState] = useState<DeviceState>(
    DeviceInitialState,
  )

  const [password, setPassword] = useState(false)
  const [
    updateDevice,
    { loading: mutationLoading, data: updatedDeviceData },
  ] = useMutation(UPDATE_DEVICE, {
    onCompleted() {
      refetch()
    },
  })

  useEffect(() => {
    setDeviceState({
      sipExtension: pathOr("", ["device", "sipExtension"], data),
      description: pathOr(null, ["device", "description"], data),
      location: pathOr(null, ["device", "location"], data),
      enabled: pathOr(true, ["device", "enabled"], data),
    })
  }, [data])

  // Handle the systemGenerated checkbox
  const updatePassword = e => {
    setPassword(e.target.checked)

    if (password)
      setDeviceState({
        sipExtension: deviceState.sipExtension,
        description: deviceState.description,
        location: deviceState.location,
        enabled: deviceState.enabled,
      })
    else
      setDeviceState({
        ...deviceState,
        password: null,
      })
  }

  if (loading) return <Loading />

  // Update the Field
  const updateField = e => {
    if (e.target.type === "checkbox")
      setDeviceState({
        ...deviceState,
        [e.target.name]: e.target.checked,
      })

    if (e.target.type === "text")
      setDeviceState({
        ...deviceState,
        [e.target.name]: e.target.value === "" ? null : e.target.value,
      })
  }

  // Send Mutation to API
  const submitHandler = () => {
    updateDevice({
      variables: {
        id,
        device: {
          ...deviceState,
        },
      },
    }).catch(() => {})
  }

  const { sipExtension, location, description, enabled } = deviceState

  const formDisabled = !isNil(updatedDeviceData) || mutationLoading

  return (
    <ValidatorForm
      onSubmit={submitHandler}
      autoComplete="off"
      className={styles.formValidator}>
      <FormGroup>
        <FormControl>
          <p>Device ID: {id}</p>
        </FormControl>
        {/*  Address = sipExtension */}
        <FormControl margin="normal">
          <TextValidator
            InputLabelProps={{ shrink: true }}
            class="standard-basic"
            name="sipExtension"
            label="Address"
            onChange={updateField}
            value={sipExtension}
            disabled={formDisabled}
            InputProps={{
              className: styles.textControl,
            }}
            validators={[
              "required",
              "minNumber:12000",
              "maxNumber:17999",
              "isNumber",
            ]}
            errorMessages={[
              "This field is required.",
              "Number must be above 12000.",
              "Number must be below 17999.",
              "Must contain only numerical characters.",
            ]}
          />
        </FormControl>

        {/*  Location = location */}
        <FormControl margin="normal">
          <TextValidator
            InputLabelProps={{ shrink: true }}
            class="standard-basic"
            name="location"
            label="Location"
            onChange={updateField}
            value={location}
            disabled={formDisabled}
            InputProps={{
              className: styles.textControl,
            }}
          />
        </FormControl>

        {/*  Description = description */}
        <FormControl margin="normal">
          <TextValidator
            InputLabelProps={{ shrink: true }}
            class="standard-basic"
            name="description"
            label="Description"
            onChange={updateField}
            value={description}
            disabled={formDisabled}
            InputProps={{
              className: styles.textControl,
            }}
          />
        </FormControl>

        {/*  Status = enabled  */}
        <FormControlLabel
          label="enabled"
          control={
            <Switch
              checked={enabled}
              onChange={updateField}
              color="primary"
              name="enabled"
              disabled={formDisabled}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
        />

        {/*  UPDATE ONLY - Reset Password */}
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Checkbox
                value={password}
                onChange={updatePassword}
                name="System Generated password"
              />
            }
            label="System generated password"
            disabled={formDisabled}
          />
        </FormControl>

        {isNil(updatedDeviceData) && (
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={formDisabled}
            className={styles.DeviceButton}>
            {mutationLoading ? "Updating" : "Update"}
          </Button>
        )}
        {!isNil(updatedDeviceData) && "Updated the device successfully"}
      </FormGroup>
    </ValidatorForm>
  )
}

export default GeneralSettingsUpdate
