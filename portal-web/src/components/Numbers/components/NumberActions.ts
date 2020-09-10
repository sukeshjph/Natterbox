import { createAction } from "@reduxjs/toolkit"
import { INumber } from "./Number.type"

/* NumberList Actions starts */

export const setError = createAction<string>("setError")
export const removeError = createAction("removeError")

export const setShowAddNew = createAction<boolean>("setShowAddNew")
export const setPageLength = createAction<number>("setPageLength")
export const setCurrentPageIndex = createAction<number>("setCurrentPageIndex")
export const setColumnsToShow = createAction<IColType<INumber>[]>(
  "setColumnsToShow",
)
export const setShowUpdateView = createAction<boolean>("setShowUpdateView")
export const setCurrentNumber = createAction<INumber>("setCurrentNumber")

/* NumberList Actions ends  */

/* NumberUpdate Actions starts */
export const setLabel = createAction<string>("setLabel")
export const setUserId = createAction<string>("setUserId")
export const setUsersDropdown = createAction<boolean>("setUsersDropdown")
export const setReloadUsers = createAction("setReloadUsers")
export const setUsersLoading = createAction<boolean>("setUsersLoading")
export const setErrorSnack = createAction<boolean>("setErrorSnack")

/* NumberUpdate Actions ends */
