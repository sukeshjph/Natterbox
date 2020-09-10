import { createAction } from "@reduxjs/toolkit"
import { IPolicyDefault } from "./Archiving.type"

export const setError = createAction<string>("setError")
export const removeError = createAction("removeError")

export const setInitialDefaultPolicies = createAction<IPolicyDefault>(
  "setInitialDefaultPolicies",
)

export const setDefaultPolicy = createAction<Record<string, string>>(
  "setDefaultPolicy",
)
