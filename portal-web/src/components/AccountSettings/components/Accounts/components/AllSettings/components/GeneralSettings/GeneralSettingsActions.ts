import { ChangeEvent } from "react"
import { createAction } from "@reduxjs/toolkit"
import { IGeneralSettings } from "./GeneralSettings.type"

export const actions = {
  SETERRORSNACK: "setErrorSnack",
  SUBMITHANDLER: "submitHandler",
  UPDATEFIELD: "updateField",
  SETGENERALSETTINGS: "setGeneralSettings",
}

export const setGeneralSettings = createAction<IGeneralSettings>(
  actions.SETGENERALSETTINGS,
)

export const setErrorSnack = createAction<boolean>(actions.SETERRORSNACK)

export const submitHandler = createAction(actions.SUBMITHANDLER)

export const updateField = createAction<ChangeEvent<HTMLInputElement>>(
  actions.UPDATEFIELD,
)
