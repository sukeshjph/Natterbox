/* eslint-disable jsx-a11y/anchor-is-valid */
import { useReducer, useEffect } from "react"
import { downloadRecordingFile, getFileStream } from "helpers/http"
import { useSapienProxyData } from "hooks"
import {
  recordingReducer,
  initialRecordingState,
} from "./CallLogRecordingReducer"

import {
  getCallLogRecording,
  getCallLogRecordingComplete,
  getCallLogRecordingError,
  setCallLogStreamAudioUrl,
  setCallLogDownloadAudioType,
} from "./CallLogRecordingActions"

type ownProps = {
  recordingUuid: string
}

export const useCallLogRecordingPlay = ({ recordingUuid }) => {
  const { userToken, sapienUrl, orgId } = useSapienProxyData()

  const [state, dispatch] = useReducer(recordingReducer, initialRecordingState)

  const handleAudioChunkCallBack = chunks => {
    dispatch(
      setCallLogStreamAudioUrl(
        window.URL.createObjectURL(new Blob(chunks, { type: "audio/wav" })),
      ),
    )
  }

  useEffect(() => {
    const runStreamPlayer = async () => {
      await getFileStream({
        url: `${sapienUrl}/organisation/${orgId}/archive/recording/${recordingUuid}`,
        userToken: userToken!,
        acceptHeader:
          state.audioExtension === "mp3" ? "audio/mpeg" : "audio/wav",
        handleAudioCallBack: handleAudioChunkCallBack,
      })
    }

    runStreamPlayer()
  }, [])

  const handleDownloadRecording = async () => {
    try {
      dispatch(getCallLogRecording())
      const blob = await downloadRecordingFile({
        url: `${sapienUrl}/organisation/${orgId}/archive/recording/${recordingUuid}`,
        userToken: userToken!,
        acceptHeader:
          state.audioExtension === "mp3" ? "audio/mpeg" : "audio/wav",
      })

      dispatch(getCallLogRecordingComplete({ uuid: recordingUuid, blob }))
    } catch (error) {
      dispatch(getCallLogRecordingError(error))
    }
  }

  const handleCallLogRecordingType = event =>
    dispatch(setCallLogDownloadAudioType(event.target.value))

  return {
    handleDownloadRecording,
    state,
    handleCallLogRecordingType,
  }
}
