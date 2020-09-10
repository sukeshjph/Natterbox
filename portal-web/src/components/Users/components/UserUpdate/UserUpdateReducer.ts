import { createReducer } from "@reduxjs/toolkit"
import {
  setUserDetailsUpdateState,
  setDevices,
  setDevicesCache,
} from "../../UserActions"
import { userDetailsUpdateStateType } from "../../User.type"

export const userDetailsUpdateState: userDetailsUpdateStateType = {
  user: {
    firstName: "",
    middleNames: "",
    lastName: "",
    primaryMobileNumber: null,
    userName: "",
    sipExtension: null,
    permissionLevel: "BASIC",
    enabled: false,
    sipDevices: [],
  },
  devicesCache: [],
  devices: [],
}

export const userDetailsReducer = createReducer(
  userDetailsUpdateState,
  builder =>
    builder
      .addCase(setUserDetailsUpdateState, (state, action) => {
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
        }
      })
      .addCase(setDevices, (state, action) => ({
        ...state,
        devices: [...action.payload],
      }))
      .addCase(setDevicesCache, (state, action) => ({
        ...state,
        devicesCache: [...action.payload],
      })),
)
