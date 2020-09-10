import { createReducer } from "@reduxjs/toolkit"
import fileDownload from "js-file-download"
import {
  getCallLogRecording,
  getCallLogRecordingComplete,
  getCallLogRecordingError,
  setCallLogStreamAudioUrl,
  setCallLogDownloadAudioType,
} from "./CallLogRecordingActions"

export const initialRecordingState = {
  isRecordingLoading: false,
  error: "",
  blob: null,
  audioUrl: "",
  audioExtension: "mp3",
}

export const recordingReducer = createReducer(initialRecordingState, builder =>
  builder
    .addCase(getCallLogRecording, state => ({
      ...state,
      isRecordingLoading: true,
    }))
    .addCase(getCallLogRecordingComplete, (state, action) => {
      const { uuid, blob } = action.payload
      fileDownload(blob, `${uuid}.${state.audioExtension}`)
      return {
        ...state,
        isRecordingLoading: false,
        error: "",
      }
    })
    .addCase(getCallLogRecordingError, (state, action) => ({
      ...state,
      isRecordingLoading: false,
      error: action.payload,
    }))
    .addCase(setCallLogStreamAudioUrl, (state, action) => ({
      ...state,
      audioUrl: action.payload,
    }))
    .addCase(setCallLogDownloadAudioType, (state, action) => ({
      ...state,
      audioExtension: action.payload,
    })),
)
