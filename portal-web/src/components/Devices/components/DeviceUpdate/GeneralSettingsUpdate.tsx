import React, { useState, useEffect } from "react"
import { pathOr } from "ramda"
import { useMutation, useQuery } from "@apollo/react-hooks"
import FormControl from "@material-ui/core/FormControl"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

import Dialog from "@material-ui/core/Dialog"
import Box from "@material-ui/core/Box"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { Loading } from "../../../shared/Loading/Loading"
import { VIEW_DEVICE, UPDATE_DEVICE, DELETE_DEVICE } from "../DeviceQueries"
import styles from "../Device.module.scss"

type DeviceState = Pick<
  IDevice,
  "sipExtension" | "description" | "location" | "enabled"
>

const DeviceInitialState = {
  sipExtension: "",
  description: "",
  location: "",
  enabled: true,
}

type ownProps = {
  id: string
  closeDialog: () => void
  refreshData: () => void
}

const GeneralSettingsUpdate: React.FC<ownProps> = ({
  id,
  closeDialog,
  refreshData,
}) => {
  const { loading, data } = useQuery(VIEW_DEVICE, {
    variables: { id },
  })

  const [deviceState, setDeviceState] = useState<DeviceState>(
    DeviceInitialState,
  )

  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<
    boolean
  >(false)

  const [
    updateDevice,
    { loading: mutationLoading, data: updatedDeviceData },
  ] = useMutation(UPDATE_DEVICE)

  const [deleteDevice, { loading: deleteMutationLoading }] = useMutation(
    DELETE_DEVICE,
    {
      onCompleted() {
        closeDialog()
        refreshData()
      },
    },
  )

  useEffect(() => {
    setDeviceState({
      sipExtension: pathOr("", ["device", "sipExtension"], data),
      description: pathOr(null, ["device", "description"], data),
      location: pathOr(null, ["device", "location"], data),
      enabled: pathOr(true, ["device", "enabled"], data),
    })
  }, [data])

  // Handle the systemGenerated checkbox
  const updatePassword = () => {
    updateDevice({
      variables: {
        id,
        device: {
          password: null,
        },
      },
    }).catch(() => {})
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

  // delete the device
  const deleteDeviceAction = () => {
    deleteDevice({
      variables: {
        id,
      },
    }).catch(() => {})
  }

  const { sipExtension, location, description, enabled } = deviceState

  const formDisabled = mutationLoading || deleteMutationLoading

  return (
    <>
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
              label="Location (Optional)"
              onChange={updateField}
              value={location}
              disabled={formDisabled}
              validators={["matchRegexp:^.{0,32}$"]}
              errorMessages={["Cannot be more than 32 characters"]}
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
              label="Description (Optional)"
              validators={["matchRegexp:^.{0,32}$"]}
              errorMessages={["Cannot be more than 32 characters"]}
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
          <FormGroup>
            <FormControl margin="normal">
              <Button
                onClick={() => updatePassword()}
                color="primary"
                variant="contained"
                disabled={formDisabled}
                className={styles.DeviceButton}>
                {mutationLoading ? "Updating" : "Reset Password"}
              </Button>
            </FormControl>
            {updatedDeviceData &&
              updatedDeviceData.updateDevice &&
              updatedDeviceData.updateDevice.password && (
                <>
                  <p>
                    <strong>
                      *The password has now changed for this device. Please make
                      a note of the new password as we will not show it to you
                      again. You will need to update your IP phone or soft phone
                      with this new password in order for you to be able to make
                      and receive calls.
                    </strong>
                  </p>
                  <p>{updatedDeviceData.updateDevice.password}</p>
                </>
              )}
          </FormGroup>
          <Box>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={formDisabled}
              className={styles.DeviceButton}>
              {mutationLoading ? "Updating" : "Update"}
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => setShowDeleteConfirmDialog(true)}
              color="secondary"
              variant="contained"
              disabled={formDisabled}
              className={styles.DeviceButton}>
              {deleteMutationLoading ? "Deleting" : "Delete"}
            </Button>
          </Box>
        </FormGroup>
      </ValidatorForm>
      <Dialog
        open={showDeleteConfirmDialog}
        onClick={() => setShowDeleteConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete the device?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteConfirmDialog(false)}
            color="primary">
            Cancel
          </Button>
          <Button onClick={deleteDeviceAction} color="primary" autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GeneralSettingsUpdate
