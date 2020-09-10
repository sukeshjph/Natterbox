import { createAction } from "@reduxjs/toolkit"
import { tableRow } from "./CallLogs.type"

/* Search Actions starts */

export const setError = createAction<string>("setError")
export const removeError = createAction("removeError")
export const setStartTime = createAction<Date | null>("setStartTime")
export const setEndTime = createAction<Date | null>("setEndTime")
export const setUsersLoading = createAction<boolean | null>("setUsersLoading")

export const setSearchState = createAction<Record<string, any>>(
  "setSearchState",
)

export const addSearchRow = createAction<tableRow>("addSearchRow")

export const updateSearchRow = createAction<{
  rowIndex: number
  rowKey: string
}>("updateSearchRow")

export const removeSearchRow = createAction<number>("removeSearchRow")

export const resetForm = createAction("resetForm")

/* Search Actions ends  */
