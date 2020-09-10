import { createAction } from "@reduxjs/toolkit"
import { ChangeEvent } from "react"
import { ILocaleSettingsType } from "./LocaleSettings.type"

export const actions = {
  SETLOCALESETTINGS: "setLocaleSettings",
  SUBMITHANDLER: "submitHandler",
  UPDATEFIELD: "updateField",
  SETNUMBERS: "setNumbers",
}

export const setLocaleSettings = createAction<ILocaleSettingsType>(
  actions.SETLOCALESETTINGS,
)

export const submitHandler = createAction(actions.SUBMITHANDLER)

export const updateField = createAction<ChangeEvent<HTMLInputElement>>(
  actions.UPDATEFIELD,
)

export const setNumbers = createAction<string[]>(actions.SETNUMBERS)
