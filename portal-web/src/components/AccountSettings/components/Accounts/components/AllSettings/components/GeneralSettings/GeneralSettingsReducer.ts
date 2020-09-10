import { createReducer } from "@reduxjs/toolkit"

import { GeneralSettingsStateType } from "./GeneralSettings.type"
import {
  setErrorSnack,
  submitHandler,
  updateField,
  setGeneralSettings,
} from "./GeneralSettingsActions"

export const initialGeneralSettingsState: GeneralSettingsStateType = {
  errorSnack: false,
  generalSettings: {
    orgId: undefined,
    name: undefined,
    alias: undefined,
    maxUsers: undefined,
    maxDevices: undefined,
    maxConnectors: undefined,
    maxSIPTrunkLicenses: undefined,
    directNotifications: undefined,
    logCompliance: undefined,
    twoFactorAuth: undefined,
  },
  updateGeneralSettings: undefined,
}

export const generalSettingsReducer = createReducer(
  initialGeneralSettingsState,
  builder =>
    builder
      .addCase(setErrorSnack, (state, action) => ({
        ...state,
        errorSnack: action.payload,
      }))
      .addCase(setGeneralSettings, (state, action) => ({
        ...state,
        generalSettings: action.payload,
      }))
      .addCase(submitHandler, state => {
        return {
          ...state,
        }
      })
      .addCase(updateField, (state, action) => {
        return {
          ...state,
          generalSettings: {
            ...state.generalSettings,
            ...action.payload,
          },
        }
      }),
)
