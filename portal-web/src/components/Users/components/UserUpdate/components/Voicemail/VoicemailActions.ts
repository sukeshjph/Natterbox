import { createAction } from "@reduxjs/toolkit"
import { ChangeEvent } from "react"
import { IVoicemailType } from "./Voicemail.type"

export const actions = {
  SETVOICEMAIL: "setVoicemail",
  SUBMITHANDLER: "submitHandler",
  UPDATEFIELD: "updateField",
  SETUSERS: "setUsers",
  SETUSERSCACHE: "setUsersCache",
  ADDEMAILTO: "addEmailTo",
  DELETEEMAILTO: "deleteEmailTo",
}

export const setVoicemail = createAction<IVoicemailType>(actions.SETVOICEMAIL)

export const submitHandler = createAction(actions.SUBMITHANDLER)

export const updateField = createAction<ChangeEvent<HTMLInputElement>>(
  actions.UPDATEFIELD,
)

export const setUsers = createAction<IUser[]>(actions.SETUSERS)

export const setUsersCache = createAction<IUser[]>(actions.SETUSERSCACHE)

export const addEmailTo = createAction<any>(actions.ADDEMAILTO)

export const deleteEmailTo = createAction<any>(actions.DELETEEMAILTO)
