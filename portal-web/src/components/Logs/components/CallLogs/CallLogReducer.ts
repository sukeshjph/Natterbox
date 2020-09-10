import { createReducer } from "@reduxjs/toolkit"
import { searchKeys, SearchStateType } from "./CallLogs.type"
import {
  setError,
  removeError,
  setStartTime,
  setEndTime,
  setUsersLoading,
  setSearchState,
  resetForm,
  addSearchRow,
  updateSearchRow,
  removeSearchRow,
} from "./CallLogActions"

// #region Search Reducer
const initialSearchParams = {
  [searchKeys.FromNumber]: "",
  [searchKeys.FromUserId]: "",
  [searchKeys.ToNumberDialled]: "",
  [searchKeys.ConnectedTo]: "",
  [searchKeys.ConnectedToNumber]: "",
  [searchKeys.Uuid]: "",
}

export const initialSearchState: SearchStateType = {
  startTime: null,
  endTime: null,
  usersLoading: null,
  searchRows: [],
  searchState: initialSearchParams,
  showError: false,
  error: "",
}

export const searchReducer = createReducer(initialSearchState, builder =>
  builder
    .addCase(setError, (state, action) => ({
      ...state,
      showError: true,
      error: action.payload,
    }))
    .addCase(removeError, state => ({
      ...state,
      showError: false,
      error: "",
    }))
    .addCase(setStartTime, (state, action) => ({
      ...state,
      startTime: action.payload,
    }))
    .addCase(setEndTime, (state, action) => ({
      ...state,
      endTime: action.payload,
    }))
    .addCase(setUsersLoading, (state, action) => ({
      ...state,
      usersLoading: action.payload,
    }))
    .addCase(resetForm, state => ({
      ...state,
      ...initialSearchState,
    }))
    .addCase(addSearchRow, (state, action) => ({
      ...state,
      searchRows: [...state.searchRows, action.payload],
    }))
    .addCase(removeSearchRow, (state, action) => ({
      ...state,
      searchRows: state.searchRows.filter(
        (_, index) => index !== action.payload,
      ),
    }))
    .addCase(updateSearchRow, (state, action) => {
      const { rowIndex, rowKey } = action.payload
      return {
        ...state,
        searchRows: [
          ...state.searchRows.slice(0, rowIndex),
          {
            ...state.searchRows[rowIndex],
            rowKey,
          },
          ...state.searchRows.slice(rowIndex + 1),
        ],
      }
    })
    .addCase(setSearchState, (state, action) => ({
      ...state,
      searchState: {
        ...state.searchState,
        ...action.payload,
      },
    })),
)
// #endregion
