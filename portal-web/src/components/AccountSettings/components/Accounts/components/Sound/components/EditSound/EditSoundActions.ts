import { createAction } from "@reduxjs/toolkit"
import {
  updateSoundFile,
  downloadSoundFile,
  deleteSoundFile,
} from "helpers/http"

export const setError = createAction<string>("setError")
export const removeError = createAction("removeError")

export const setEditSoundState = createAction<Record<string, any>>(
  "setEditSoundState",
)

export const setSoundFileUpdating = createAction<boolean>(
  "setSoundFileUpdating",
)

export const setSoundFileDownloading = createAction<boolean>(
  "setSoundFileDownloading",
)

export const setSoundFileDeleting = createAction<boolean>(
  "setSoundFileDeleting",
)

export const setSuccessMessage = createAction<string>("setSuccessMessage")

export const setDownloadedFile = createAction<{ file: any; soundId: string }>(
  "setDownloadedFile",
)

export const setDeleteDialog = createAction<boolean>("setDeleteDialog")

// Thunk like action creator
export const updateSoundFileWithProps = ({
  url,
  userToken,
  refetch,
  closeDialog,
}) => {
  return async (dispatch, getState) => {
    const { tag, description, uploadedFile } = getState()
    dispatch(setSoundFileUpdating(true))

    const result = await updateSoundFile({
      url,
      userToken,
      tag,
      description,
      file: uploadedFile,
    })

    dispatch(setSoundFileUpdating(false))

    if (result.error) {
      dispatch(setError(result.error))
    }

    if (result.message) {
      dispatch(setSuccessMessage(result.message))
      refetch()
      closeDialog()
    }
  }
}

export const downloadWavFile = ({ url, userToken, soundId }) => {
  return async dispatch => {
    dispatch(setSoundFileDownloading(true))

    const result = await downloadSoundFile({
      url,
      userToken,
    })

    dispatch(setSoundFileDownloading(false))

    if (result.error) {
      dispatch(setError(result.error))
    } else {
      dispatch(setDownloadedFile({ file: result, soundId }))
    }
  }
}

export const deleteSound = ({ url, userToken, refetch, closeDialog }) => {
  return async dispatch => {
    dispatch(setSoundFileDeleting(true))

    const result = await deleteSoundFile({
      url,
      userToken,
    })

    dispatch(setSoundFileDeleting(false))

    if (result.error) {
      dispatch(setError(result.error))
    } else {
      dispatch(setSuccessMessage(result.message))
      refetch()
      closeDialog()
    }
  }
}
