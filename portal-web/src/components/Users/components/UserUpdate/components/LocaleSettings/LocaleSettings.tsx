import React, { useReducer } from "react"
import { useQuery } from "@apollo/react-hooks"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import FormControl from "@material-ui/core/FormControl"
import { pluck } from "ramda"

// our libs
import styles from "./LocaleSettings.module.scss"
import { GET_ALL_NUMBERS, GET_LOCALE_SETTINGS } from "../../../../UserQueries"
import { Loading } from "../../../../../shared"
import {
  localeSettingsReducer,
  localeSettingsState,
} from "./LocaleSettingsReducer"
import {
  setLocaleSettings,
  setNumbers,
  submitHandler,
  updateField,
} from "./LocalSettingsActions"
import { LocaleSettingsMiddleware } from "./LocaleSettingsMiddleware"

type OwnProps = {
  userId: number
}

export const LocaleSettings: React.FC<OwnProps> = ({ userId }: OwnProps) => {
  const [state, dispatch] = useReducer(localeSettingsReducer, {
    ...localeSettingsState,
  })

  const { loading: localeSettingsLoading } = useQuery(GET_LOCALE_SETTINGS, {
    variables: { id: userId },
    onCompleted(data) {
      dispatch(
        setLocaleSettings({
          internalCallerIdNumber:
            data.userSettings.settings.internalCallerIdNumber || "",
          externalCallerIdNumber:
            data.userSettings.settings.externalCallerIdNumber || "",
          internalCallerIdName:
            data.userSettings.settings.internalCallerIdName || "",
          presentCallerId: data.userSettings.settings.presentCallerId || "",
          voice: data.userSettings.settings.voice || "",
          countryCode: data.userSettings.settings.countryCode || "",
          timezone: data.userSettings.settings.timezone || "",
        }),
      )
    },
  })

  const { loading: numbersLoading } = useQuery(GET_ALL_NUMBERS, {
    onCompleted(data) {
      const getNumbers = pluck("number")
      const numbers: string[] = getNumbers(data.numbers)
      dispatch(setNumbers(numbers))
    },
  })

  const enhancedDispatch = LocaleSettingsMiddleware(dispatch)

  const {
    settings,
    numbers,
    countries,
    voices,
    timezones,
    countriesCache,
    voicesCache,
    timezonesCache,
  } = state

  const {
    presentCallerId,
    externalCallerIdNumber,
    internalCallerIdNumber,
    internalCallerIdName,
  } = settings

  if (localeSettingsLoading || numbersLoading) return <Loading />

  return (
    <ValidatorForm
      onSubmit={() => enhancedDispatch(submitHandler(), state)}
      autoComplete="off"
      className={styles.formValidator}>
      <h4>This is a LocaleSettings Page</h4>
      {numbers.length > 0 && (
        <FormGroup>
          {/* Home Countries */}
          <FormControl margin="normal">
            <Autocomplete
              id="tags-standard"
              options={countries}
              value={countriesCache}
              onChange={(e: any) => dispatch(updateField(e.target.value))}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Home Countries"
                />
              )}
            />
          </FormControl>
          {/* Time Zones */}
          <FormControl margin="normal">
            <Autocomplete
              id="tags-standard"
              options={timezones}
              value={timezonesCache}
              onChange={(e: any) => dispatch(updateField(e.target.value))}
              renderInput={params => (
                <TextField {...params} variant="standard" label="Time Zones" />
              )}
            />
          </FormControl>
          {/* Voices */}
          <FormControl margin="normal">
            <Autocomplete
              id="tags-standard"
              options={voices}
              value={voicesCache}
              onChange={(e: any) => dispatch(updateField(e.target.value))}
              renderInput={params => (
                <TextField {...params} variant="standard" label="Voices" />
              )}
            />
          </FormControl>
          {/* Present Caller Identity Number */}
          <FormControl margin="normal">
            <FormControlLabel
              control={
                <Switch
                  checked={presentCallerId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.persist()
                    enhancedDispatch(updateField(e), state)
                  }}
                  name="presentCallerId"
                  color="primary"
                />
              }
              label="Present Caller ID"
            />
          </FormControl>
          {/* Caller Identity Number (External) */}
          <FormControl margin="normal">
            <Autocomplete
              id="tags-standard"
              options={numbers}
              value={externalCallerIdNumber}
              onChange={(e: any) => dispatch(updateField(e.target.value))}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Caller Identity Number (External)"
                />
              )}
            />
          </FormControl>
          {/* Caller Identify Number (Internal) */}
          <FormControl margin="normal">
            <TextValidator
              label="Caller Identity Number (Internal)"
              name="internalCallerIdNumber"
              class="standard-basic"
              value={internalCallerIdNumber}
              onChange={(e: any) => dispatch(updateField(e.target.value))}
              InputProps={{
                className: styles.textControl,
              }}
              validators={["required"]}
              errorMessages={["This field is required."]}
            />
          </FormControl>
          {/* Caller Identity Name */}
          <FormControl margin="normal">
            <TextValidator
              label="Caller Identity Name"
              name="internalCallerIdName"
              class="standard-basic"
              value={internalCallerIdName}
              onChange={(e: any) => dispatch(updateField(e.target.value))}
              InputProps={{
                className: styles.textControl,
              }}
              validators={["required"]}
              errorMessages={["This field is required."]}
            />
          </FormControl>
          {/* Submit Button */}
          <FormControl margin="normal">
            <Button
              variant="contained"
              size="medium"
              type="submit"
              color="primary"
              className={styles.Button}>
              Save
            </Button>
          </FormControl>
        </FormGroup>
      )}
    </ValidatorForm>
  )
}
