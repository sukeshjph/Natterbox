import { createAction } from "@reduxjs/toolkit"

export const setError = createAction<string>("setError")
export const removeError = createAction("removeError")
export const setCreatePolicy = createAction<Record<string, any>>(
  "setCreatePolicy",
)
