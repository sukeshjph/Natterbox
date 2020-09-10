import { createReducer } from "@reduxjs/toolkit"
import { NumberColProps } from "./NumberColProps"
import { NumberState } from "./Number.type"
import * as NumberActions from "./NumberActions"

// #region Number Reducer

const pagerOptions = [100, 150, 250, 400]

export const initialNumberState: NumberState = {
  columnsToShow: NumberColProps,
  showAddNew: false,
  showUpdateView: false,
  showError: false,
  error: "",
  pageLength: pagerOptions[0],
  currentPageIndex: 0,
  currentNumber: {
    label: null,
    number: null,
    countryCode: null,
    userId: null,
    policyId: null,
  },
}

export const numberReducer = createReducer(initialNumberState, builder =>
  builder
    .addCase(NumberActions.setError, (state, action) => ({
      ...state,
      showError: true,
      error: action.payload,
    }))
    .addCase(NumberActions.removeError, state => ({
      ...state,
      showError: false,
      error: "",
    }))
    .addCase(NumberActions.setShowAddNew, (state, action) => ({
      ...state,
      showAddNew: action.payload,
    }))
    .addCase(NumberActions.setPageLength, (state, action) => ({
      ...state,
      pageLength: action.payload,
    }))
    .addCase(NumberActions.setCurrentPageIndex, (state, action) => ({
      ...state,
      currentPageIndex: action.payload,
    }))
    .addCase(NumberActions.setColumnsToShow, (state, action) => ({
      ...state,
      columnsToShow: action.payload,
    }))
    .addCase(NumberActions.setShowUpdateView, (state, action) => ({
      ...state,
      showUpdateView: action.payload,
    }))
    .addCase(NumberActions.setCurrentNumber, (state, action) => ({
      ...state,
      currentNumber: action.payload,
    })),
)
// #endregion

// #region Number Reducer

export const initialUpdateNumberState = {
  label: "",
  userId: "",
  reloadUsers: Math.random(),
  usersDropdown: false,
  usersLoading: false,
  errorSnack: false,
}

export const numberUpdateReducer = createReducer(
  initialUpdateNumberState,
  builder =>
    builder
      .addCase(NumberActions.setLabel, (state, action) => ({
        ...state,
        label: action.payload,
      }))
      .addCase(NumberActions.setUserId, (state, action) => ({
        ...state,
        userId: action.payload,
      }))
      .addCase(NumberActions.setReloadUsers, state => ({
        ...state,
        reloadUsers: Math.random(),
      }))
      .addCase(NumberActions.setUsersDropdown, (state, action) => ({
        ...state,
        usersDropdown: action.payload,
      }))
      .addCase(NumberActions.setUsersLoading, (state, action) => ({
        ...state,
        usersLoading: action.payload,
      }))
      .addCase(NumberActions.setErrorSnack, (state, action) => ({
        ...state,
        errorSnack: action.payload,
      })),
)
// #endregion
