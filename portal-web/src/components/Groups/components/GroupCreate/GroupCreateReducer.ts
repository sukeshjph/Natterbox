import { createReducer } from "@reduxjs/toolkit"
import {
  setErrorSnack,
  setCategoryDropdown,
  setGroupState,
  setCategories,
  setSubmitType,
} from "./GroupCreateActions"

import { groupCreateInitialState } from "../Groups.type"

export const groupInitialState = {
  sipExtension: "",
  name: "",
  emailAddress: "",
  category: "",
  members: {},
}

export const initialState: groupCreateInitialState = {
  categoryDropdown: "",
  errorSnack: false,
  groupState: groupInitialState,
  submitType: 1,
  categories: [],
}

export const groupReducer = createReducer(initialState, builder =>
  builder
    .addCase(setErrorSnack, (state, action) => ({
      ...state,
      errorSnack: action.payload,
    }))
    .addCase(setGroupState, (state, action) => {
      return {
        ...state,
        groupState: {
          ...state.groupState,
          ...action.payload,
        },
      }
    })
    .addCase(setSubmitType, (state, action) => ({
      ...state,
      submitType: action.payload,
    }))
    .addCase(setCategories, (state, action) => ({
      ...state,
      categories: action.payload,
    }))
    .addCase(setCategoryDropdown, (state, action) => ({
      ...state,
      categoryDropdown: action.payload,
    })),
)
