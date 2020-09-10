import { createAction } from "@reduxjs/toolkit"
import { GroupCreateState } from "../Groups.type"

export const setErrorSnack = createAction<boolean>("setErrorSnack")
export const setCategoryDropdown = createAction<string>("setCategoryDropdown")
export const setGroupState = createAction<Partial<GroupCreateState>>(
  "setGroupState",
)
export const setCategories = createAction<string[]>("setCategories")

export const setSubmitType = createAction<1 | 2>("setSubmitType")
