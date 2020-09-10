import { createReducer } from "@reduxjs/toolkit"
import { CreateSound } from "../../Sound.type"
import {
  setAddSoundState,
  setError,
  removeError,
  setFileUploading,
} from "./CreateSoundActions"

export const initialCreateSoundState: CreateSound = {
  tag: "",
  description: "",
  file: null,
  filePath: "",
  error: "",
  showError: false,
  uploadingFile: false,
}

export const createSoundReducer = createReducer(
  initialCreateSoundState,
  builder =>
    builder
      .addCase(setError, (state, action) => ({
        ...state,
        showError: true,
        error: action.payload,
      }))
      .addCase(setFileUploading, (state, action) => ({
        ...state,
        uploadingFile: action.payload,
      }))
      .addCase(setAddSoundState, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(removeError, state => ({
        ...state,
        showError: false,
        error: "",
      })),
)
