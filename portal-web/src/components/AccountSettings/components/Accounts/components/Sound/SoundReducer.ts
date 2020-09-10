import { createReducer } from "@reduxjs/toolkit"
import { SoundColProps } from "./SoundColProps"
import * as SoundActions from "./SoundActions"
import { SoundListState } from "./Sound.type"

// #region Sound Reducer

const pagerOptions = [100, 150, 250, 400]

export const initialSoundListState: SoundListState = {
  columnsToShow: SoundColProps,
  showAddSound: false,
  showEditSound: false,
  showError: false,
  error: "",
  pageLength: pagerOptions[0],
  currentPageIndex: 0,
  currentSound: {
    tag: "",
    description: "",
    id: 0,
  },
}

export const soundReducer = createReducer(initialSoundListState, builder =>
  builder
    .addCase(SoundActions.setError, (state, action) => ({
      ...state,
      showError: true,
      error: action.payload,
    }))
    .addCase(SoundActions.setShowAddSound, (state, action) => ({
      ...state,
      showAddSound: action.payload,
    }))
    .addCase(SoundActions.setCurrentSound, (state, action) => ({
      ...state,
      currentSound: action.payload,
    }))
    .addCase(SoundActions.setShowEditSound, (state, action) => ({
      ...state,
      showEditSound: action.payload,
    }))
    .addCase(SoundActions.removeError, state => ({
      ...state,
      showError: false,
      error: "",
    }))

    .addCase(SoundActions.setPageLength, (state, action) => ({
      ...state,
      pageLength: action.payload,
    }))
    .addCase(SoundActions.setCurrentPageIndex, (state, action) => ({
      ...state,
      currentPageIndex: action.payload,
    }))
    .addCase(SoundActions.setColumnsToShow, (state, action) => ({
      ...state,
      columnsToShow: action.payload,
    })),
)
// #endregion
