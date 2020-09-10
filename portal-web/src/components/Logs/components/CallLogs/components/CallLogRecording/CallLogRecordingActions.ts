import { createAction } from "@reduxjs/toolkit"

export const getCallLogRecording = createAction("getCallLogRecording")
export const getCallLogRecordingComplete = createAction<{
  uuid: string
  blob: any
}>("getCallLogRecordingComplete")
export const getCallLogRecordingError = createAction<string>(
  "getCallLogRecordingError",
)
export const setCallLogStreamAudioUrl = createAction<string>(
  "setCallLogStreamAudioUrl",
)

export const setCallLogDownloadAudioType = createAction<string>(
  "setCallLogDownloadAudioType",
)
