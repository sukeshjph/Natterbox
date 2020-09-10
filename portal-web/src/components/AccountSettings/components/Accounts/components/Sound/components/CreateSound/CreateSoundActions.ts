import { createAction } from "@reduxjs/toolkit"
import { uploadSoundFile } from "helpers/http"

export const setError = createAction<string>("setError")
export const removeError = createAction("removeError")

export const setAddSoundState = createAction<Record<string, any>>(
  "setAddSoundState",
)

export const setFileUploading = createAction<boolean>("setFileUploading")

// Thunk like action creator
export const uploadWavFile = ({ url, userToken, refetch, closeDialog }) => {
  return async (dispatch, getState) => {
    const { tag, description, file } = getState()
    dispatch(setFileUploading(true))

    const result = await uploadSoundFile({
      url,
      userToken,
      tag,
      description,
      file,
    })

    dispatch(setFileUploading(false))

    if (result.error) {
      dispatch(setError(result.error))
    }

    if (result.message) {
      closeDialog()
      refetch()
    }
  }
}
