import { createAction } from "@reduxjs/toolkit"
import { userDetailsUpdate, userCreateStateType } from "./User.type"

export const setError = createAction<string>("setError")
export const removeError = createAction("removeError")
export const setShowAddNew = createAction<boolean>("setShowAddNew")
export const setUserDetails = createAction<boolean>("setUserDetails")
export const setPageLength = createAction<number>("setPageLength")
export const setCurrentPageIndex = createAction<number>("setCurrentPageIndex")
export const setColumnsToShow = createAction<IColType<IUser>[]>(
  "setColumnsToShow",
)
export const setCurrentUser = createAction<
  Pick<IUser, "userId" | "userName" | "firstName" | "lastName" | "middleNames">
>("setCurrentUser")

// UserUpdate action
export const setUserDetailsUpdateState = createAction<
  Partial<userDetailsUpdate>
>("setUserDetailsUpdateState")

// UserCreate action
export const setCreateUserState = createAction<Partial<userCreateStateType>>(
  "setCreateUserState",
)

export const setDevices = createAction<IDevice[]>("setDevices")

export const setDevicesCache = createAction<IDevice[]>("setDevicesCache")
