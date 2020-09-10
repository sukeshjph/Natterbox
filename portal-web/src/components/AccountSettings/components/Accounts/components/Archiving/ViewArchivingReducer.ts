import { createReducer } from "@reduxjs/toolkit"
import * as ViewArchivingActions from "./ViewArchivingActions"
import { ArchivingState } from "./Archiving.type"

export const initialArchingState: ArchivingState = {
  showError: false,
  error: "",
  defaultPolicies: {
    callRecordingPolicy: "",
    bufferedRecordingPolicy: "",
    smsPolicy: "",
    cdrPolicy: "",
    pcapPolicy: "",
  },
}

export const ViewArchivingReducer = createReducer(
  initialArchingState,
  builder =>
    builder
      .addCase(ViewArchivingActions.setError, (state, action) => ({
        ...state,
        showError: true,
        error: action.payload,
      }))
      .addCase(
        ViewArchivingActions.setInitialDefaultPolicies,
        (state, action) => ({
          ...state,
          defaultPolicies: action.payload,
        }),
      )
      .addCase(ViewArchivingActions.setDefaultPolicy, (state, action) => ({
        ...state,
        defaultPolicies: {
          ...state.defaultPolicies,
          ...action.payload,
        },
      })),
)
