import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { isNil } from "ramda"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Switch from "@material-ui/core/Switch"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import { CREATE_DEVICE } from "../DeviceQueries"
import styles from "../Device.module.scss"

const createInitialState = {
  sipExtension: "",
  description: null,
  location: null,
  enabled: true,
}

type DeviceState = Pick<
  IDevice,
  "sipExtension" | "description" | "location" | "enabled"
>

type ownProps = {
  refreshData: () => void
}

export const GeneralSettingsCreate: React.FC<ownProps> = ({ refreshData }) => {
  const [state, setState] = useState<DeviceState>(createInitialState)

  const [systemGenerated, setSystemGenerated] = useState(false)

  const [
    createDevice,
    {
      loading: createDeviceLoading,
      error: createDeviceError,
      data: createDeviceData,
    },
  ] = useMutation(CREATE_DEVICE, {
    onCompleted() {
      refreshData()
    },
  })

  // Handle the systemGenerated checkbox
  const updateSystemGenerated = e => {
    setSystemGenerated(e.target.checked)
    // TODO - check if i need e.target.checked

    setState({
      ...state,
      sipExtension: systemGenerated ? "" : null,
    })
  }

  // Update the Field
  const updateField = e => {
    if (e.target.type === "checkbox")
      setState({
        ...state,
        [e.target.name]: e.target.checked,
      })

    if (e.target.type === "text")
      setState({
        ...state,
        [e.target.name]: e.target.value !== "" ? e.target.value : null,
      })
  }

  // Send Mutation to API
  const submitHandler = () => {
    createDevice({
      variables: {
        device: {
          ...state,
        },
      },
    }).catch(() => {})
  }

  const formDisabled = !isNil(createDeviceData) || createDeviceLoading

  const { sipExtension, location, description, enabled } = state

  const sipExtensionValidations = {
    validators: ["required", "minNumber:12000", "maxNumber:17999", "isNumber"],
    errorMessages: [
      "This field is required.",
      "Number must be above 12000.",
      "Number must be below 17999.",
      "Must contain only numerical characters.",
    ],
  }

  return (
    <ValidatorForm
      onSubmit={submitHandler}
      autoComplete="off"
      className={styles.formValidator}>
      {createDeviceError && <p>Error :( Please try again</p>}
      <FormGroup data-testid="DeviceCreateGS">
        {/*  Address = sipExtension */}
        <FormControl margin="normal" className={styles.formControl}>
          {!systemGenerated && (
            <TextValidator
              InputLabelProps={{ shrink: true }}
              class="standard-basic"
              name="sipExtension"
              value={isNil(sipExtension) ? "" : sipExtension}
              label="Address"
              onChange={updateField}
              disabled={state.sipExtension === null || formDisabled}
              InputProps={{
                className: styles.textControl,
              }}
              {...sipExtensionValidations}
              data-testid="sip-address"
            />
          )}

          {systemGenerated && (
            <TextField
              disabled={sipExtension === null || formDisabled}
              id="standard-basic"
              name="sipExtension"
              label="Address"
              onChange={updateField}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                className: styles.textControl,
              }}
            />
          )}
        </FormControl>
        {/*  CREATED ONLY - System Generated = sipExtension greyed out */}
        <FormControl margin="normal" className={styles.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                checked={systemGenerated}
                onChange={updateSystemGenerated}
                name="System Generated"
                data-testid="sys-generate-chk"
              />
            }
            disabled={formDisabled}
            label="System generated"
          />
        </FormControl>
        {/*  Location = location */}
        <FormControl margin="normal" className={styles.formControl}>
          <TextValidator
            InputLabelProps={{ shrink: true }}
            class="standard-basic"
            name="location"
            label="Location(Optional)"
            onChange={updateField}
            value={location}
            disabled={formDisabled}
            InputProps={{
              className: styles.textControl,
            }}
          />
        </FormControl>
        {/*  Description = description */}
        <FormControl margin="normal" className={styles.formControl}>
          <TextValidator
            InputLabelProps={{ shrink: true }}
            class="standard-basic"
            name="description"
            label="Description(Optional)"
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
          label="Enabled"
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
        {isNil(createDeviceData) && (
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={formDisabled}
            className={styles.DeviceButton}>
            {createDeviceLoading ? "Creating" : "Create"}
          </Button>
        )}
        {!isNil(createDeviceData) && "Created the device successfully"}
        {createDeviceError && (
          <FormControl margin="normal">
            <FormLabel
              error>{`Error creating a device:${createDeviceError.message}`}</FormLabel>
          </FormControl>
        )}{" "}
      </FormGroup>
    </ValidatorForm>
  )
}

export default GeneralSettingsCreate
