import { createReducer } from "@reduxjs/toolkit"
import fileDownload from "js-file-download"
import { EditSound } from "../../Sound.type"
import * as EditSoundActions from "./EditSoundActions"

export const initialEditSoundState: EditSound = {
  tag: "",
  description: "",
  error: "",
  showError: false,
  updatingSoundFile: false,
  downloadingSoundFile: false,
  successMessage: "",
  uploadedFile: null,
  uploadedFilePath: "",
  downloadedFile: null,
  deletingSound: false,
  showDeleteDialog: false,
}

export const editSoundReducer = createReducer(initialEditSoundState, builder =>
  builder
    .addCase(EditSoundActions.setError, (state, action) => ({
      ...state,
      showError: true,
      error: action.payload,
    }))
    .addCase(EditSoundActions.setSoundFileUpdating, (state, action) => ({
      ...state,
      updatingSoundFile: action.payload,
    }))
    .addCase(EditSoundActions.setDeleteDialog, (state, action) => ({
      ...state,
      showDeleteDialog: action.payload,
    }))
    .addCase(EditSoundActions.setSoundFileDownloading, (state, action) => ({
      ...state,
      downloadingSoundFile: action.payload,
    }))
    .addCase(EditSoundActions.setSoundFileDeleting, (state, action) => ({
      ...state,
      deletingSound: action.payload,
    }))
    .addCase(EditSoundActions.setDownloadedFile, (state, action) => {
      const { file, soundId } = action.payload
      fileDownload(file, `${soundId}.wav`)
      return {
        ...state,
        downloadedFile: action.payload,
      }
    })
    .addCase(EditSoundActions.setEditSoundState, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(EditSoundActions.setSuccessMessage, (state, action) => ({
      ...state,
      successMessage: action.payload,
    }))
    .addCase(EditSoundActions.removeError, state => ({
      ...state,
      showError: false,
      error: "",
    })),
)
