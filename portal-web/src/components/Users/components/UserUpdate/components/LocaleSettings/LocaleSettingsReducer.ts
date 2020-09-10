import { createReducer } from "@reduxjs/toolkit"
import {
  setLocaleSettings,
  submitHandler,
  updateField,
  setNumbers,
} from "./LocalSettingsActions"
import {
  timeZones,
  CountryCodes,
  Voices,
} from "../../../../../shared/Countries/index"
import { ILocaleSettingsStateType } from "./LocaleSettings.type"

export const localeSettingsState: ILocaleSettingsStateType = {
  settings: {
    internalCallerIdNumber: "",
    externalCallerIdNumber: "",
    internalCallerIdName: "",
    presentCallerId: false,
    voice: "",
    countryCode: "",
    timezone: "",
  },
  userId: undefined,
  numbers: [],
  countries: CountryCodes,
  countriesCache: {
    Country: "",
    Code: "",
  },
  timezones: timeZones,
  timezonesCache: {
    Label: "",
    Val: "",
  },
  voices: Voices,
  voicesCache: {
    "Portal Name": "",
    "Sapien Name": "",
  },
}

export const localeSettingsReducer = createReducer(
  localeSettingsState,
  builder =>
    builder
      .addCase(setLocaleSettings, (state, action) => ({
        ...state,
        settings: {
          ...action.payload,
        },
      }))
      .addCase(submitHandler, state => {
        return {
          ...state,
        }
      })
      .addCase(updateField, (state, action) => {
        return {
          ...state,
          settings: {
            ...state.settings,
            ...action.payload,
          },
        }
      })
      .addCase(setNumbers, (state, action) => {
        return {
          ...state,
          numbers: action.payload,
        }
      }),
)
