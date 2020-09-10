import { createReducer } from "@reduxjs/toolkit"
import {
  setVoicemail,
  submitHandler,
  updateField,
  setUsers,
  setUsersCache,
  addEmailTo,
  deleteEmailTo,
} from "./VoicemailActions"

import { VoicemailStateType } from "./Voicemail.type"

export const voicemailState: VoicemailStateType = {
  voicemail: {
    emailNotification: false,
    emailTo: [],
    emailAttachFile: false,
    emailKeepFile: false,
    ccMailboxes: {
      users: [],
    },
  },
  usersCache: [],
  users: [],
  updateVoicemail: undefined,
  userId: undefined,
}

export const voicemailReducer = createReducer(voicemailState, builder =>
  builder
    .addCase(setVoicemail, (state, action) => ({
      ...state,
      voicemail: {
        ...action.payload,
      },
    }))
    .addCase(submitHandler, state => {
      return {
        ...state,
      }
    })
    .addCase(updateField, (state, action) => {
      return {
        ...state,
        voicemail: {
          ...state.voicemail,
          ...action.payload,
        },
      }
    })
    .addCase(setUsers, (state, action) => {
      return {
        ...state,
        users: action.payload,
      }
    })
    .addCase(addEmailTo, (state, action) => {
      return {
        ...state,
        voicemail: {
          ...state.voicemail,
          emailTo: action.payload,
        },
      }
    })
    .addCase(deleteEmailTo, (state, action) => {
      return {
        ...state,
        voicemail: {
          ...state.voicemail,
          emailTo: action.payload,
        },
      }
    })
    .addCase(setUsersCache, (state, action) => {
      return {
        ...state,
        usersCache: action.payload,
      }
    }),
)
