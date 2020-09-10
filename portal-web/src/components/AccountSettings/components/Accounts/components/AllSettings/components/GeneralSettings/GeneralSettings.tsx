import React, { useReducer } from "react"
import { FormGroup, FormControlLabel, Switch, Button } from "@material-ui/core"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { isNil } from "ramda"
import { useMutation } from "@apollo/react-hooks"

// our libs
import FormControl from "@material-ui/core/FormControl"
import styles from "./GeneralSettings.module.scss"
import {
  IGeneralSettings,
  DirectNotifications,
  TwoFactorAuth,
  LogCompliance,
} from "./GeneralSettings.type"
import {
  generalSettingsReducer,
  initialGeneralSettingsState,
} from "./GeneralSettingsReducer"
import {
  setGeneralSettings,
  submitHandler,
  updateField,
} from "./GeneralSettingsActions"
import { UPDATE_GENERAL_SETTINGS } from "../../AllSettingsQueries"
import { GeneralSettingsMiddleware } from "./GeneralSettingsMiddleware"

type OwnProps = {
  generalSettings: IGeneralSettings
}

export const GeneralSettings: React.FC<OwnProps> = ({
  generalSettings,
}: OwnProps) => {
  const [updateGeneralSettings] = useMutation(UPDATE_GENERAL_SETTINGS, {
    onCompleted(data) {
      dispatch(
        setGeneralSettings({
          ...data.updateGeneralSettings,
        }),
      )
    },
  })

  const [state, dispatch] = useReducer(generalSettingsReducer, {
    ...initialGeneralSettingsState,
    generalSettings,
    updateGeneralSettings,
  })

  const enhancedDispatch = GeneralSettingsMiddleware(dispatch)

  const {
    orgId,
    name,
    alias,
    maxUsers,
    maxDevices,
    maxConnectors,
    maxSIPTrunkLicenses,
    directNotifications,
    logCompliance,
    twoFactorAuth,
  } = state.generalSettings

  return (
    <div className={styles.root}>
      <h3>General</h3>
      <h4>Org ID: {orgId}</h4>
      <ValidatorForm
        onSubmit={() => enhancedDispatch(submitHandler(), state)}
        autoComplete="off"
        className={styles.formValidator}>
        <FormGroup>
          {/* Name */}
          <FormControl margin="normal">
            <TextValidator
              InputLabelProps={{ shrink: true }}
              class="standard-basic"
              name="name"
              value={isNil(name) ? "" : name}
              label="Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.persist()
                enhancedDispatch(updateField(e), state)
              }}
              InputProps={{
                className: styles.textControl,
              }}
              validators={["required"]}
              errorMessages={["this field is required"]}
              data-testid="generalSettings-name"
            />
          </FormControl>
          {/* Alias */}
          <FormControl margin="normal">
            <TextValidator
              InputLabelProps={{ shrink: true }}
              class="standard-basic"
              name="alias"
              value={isNil(alias) ? "" : alias}
              label="Alias"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.persist()
                enhancedDispatch(updateField(e), state)
              }}
              InputProps={{
                className: styles.textControl,
              }}
              data-testid="generalSettings-alias"
            />
          </FormControl>
          {/* Max Users */}
          <FormControl>
            <TextValidator
              class="standard-number"
              label="Max Users"
              name="maxUsers"
              value={isNil(maxUsers) ? "" : maxUsers}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.persist()
                enhancedDispatch(updateField(e), state)
              }}
              type="number"
              validators={["minNumber:0", "maxNumber:9999"]}
              errorMessages={["Must be above 0", "Must be below 10000"]}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          {/*  Max Devices */}
          <FormControl margin="normal">
            <TextValidator
              class="standard-number"
              label="Max Devices"
              name="maxDevices"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.persist()
                enhancedDispatch(updateField(e), state)
              }}
              value={isNil(maxDevices) ? "" : maxDevices}
              type="number"
              validators={["minNumber:0", "maxNumber:9999"]}
              errorMessages={["Must be above 0", "Must be below 10000"]}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          {/*  Max Connectors */}
          <FormControl margin="normal">
            <TextValidator
              class="standard-number"
              name="maxConnectors"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.persist()
                enhancedDispatch(updateField(e), state)
              }}
              value={isNil(maxConnectors) ? "" : maxConnectors}
              label="Max Connectors"
              validators={["minNumber:0", "maxNumber:9999"]}
              errorMessages={["Must be above 0", "Must be below 10000"]}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          {/*  Max SIP Trunk Licenses */}
          <FormControl margin="normal">
            <TextValidator
              class="standard-number"
              label="Max SIP Trunk Licences"
              name="maxSIPTrunkLicenses"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.persist()
                enhancedDispatch(updateField(e), state)
              }}
              value={isNil(maxSIPTrunkLicenses) ? "" : maxSIPTrunkLicenses}
              type="number"
              validators={["minNumber:0", "maxNumber:9999"]}
              errorMessages={["Must be above 0", "Must be below 10000"]}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          {/* Redirect User Notifications */}
          <FormControl margin="normal">
            <FormControlLabel
              control={
                <Switch
                  checked={directNotifications === DirectNotifications.YES}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.persist()
                    enhancedDispatch(updateField(e), state)
                  }}
                  name="directNotifications"
                  color="primary"
                />
              }
              label="Redirect User Notifications"
            />
          </FormControl>
          {/*  Logs Compliance */}
          <FormControl margin="normal">
            <FormControlLabel
              control={
                <Switch
                  checked={logCompliance === LogCompliance.YES}
                  onChange={e => enhancedDispatch(updateField(e), state)}
                  name="logCompliance"
                  color="primary"
                />
              }
              label="Logs Compliance"
            />
          </FormControl>
          {/*  Two Factor Authentication */}
          <FormControl margin="normal">
            <FormControlLabel
              control={
                <Switch
                  checked={twoFactorAuth === TwoFactorAuth.MANDATORY}
                  onChange={e => enhancedDispatch(updateField(e), state)}
                  name="twoFactorAuth"
                  color="primary"
                />
              }
              label="Two Factor Authentication"
            />
          </FormControl>
          <FormGroup className={styles.formGroupInline}>
            <FormControl margin="normal">
              <Button
                size="medium"
                color="primary"
                className={styles.GeneralSettingsButton}>
                Revert Changes
              </Button>
            </FormControl>
          </FormGroup>
          <FormControl margin="normal">
            <Button
              variant="contained"
              size="medium"
              type="submit"
              color="primary"
              className={styles.GeneralSettingsButton}>
              Save
            </Button>
          </FormControl>
        </FormGroup>
      </ValidatorForm>
    </div>
  )
}
