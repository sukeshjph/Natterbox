import { createReducer } from "@reduxjs/toolkit"
import { setCreateUserState } from "../../UserActions"
import { userCreateStateType } from "../../User.type"

export const userCreateState: userCreateStateType = {
  firstName: "",
  middleNames: "",
  lastName: "",
  primaryMobileNumber: null,
  userName: "",
  sipExtension: null,
  permissionLevel: "BASIC",
  enabled: false,
}

export const userCreateReducer = createReducer(userCreateState, builder =>
  builder.addCase(setCreateUserState, (state, action) => ({
    ...state,
    ...action.payload,
  })),
)
