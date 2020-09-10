import { createReducer } from "@reduxjs/toolkit"
import { UserColProps } from "./UserColProps"
import {
  setError,
  removeError,
  setUserDetails,
  setPageLength,
  setCurrentPageIndex,
  setColumnsToShow,
  setCurrentUser,
  setShowAddNew,
} from "./UserActions"

const pagerOptions = [100, 150, 250, 400]

export const initialUserState = {
  pageLength: pagerOptions[0],
  userDetails: false,
  showAddNew: false,
  currentUser: {
    userName: "",
    userId: 0,
    firstName: "",
    lastName: "",
    middleNames: "",
  },
  currentPageIndex: 0,
  columnsToShow: UserColProps,
  showError: false,
  error: "",
}

export const userReducer = createReducer(initialUserState, builder =>
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
    .addCase(setUserDetails, (state, action) => ({
      ...state,
      userDetails: action.payload,
    }))
    .addCase(setShowAddNew, (state, action) => ({
      ...state,
      showAddNew: action.payload,
    }))
    .addCase(setPageLength, (state, action) => ({
      ...state,
      pageLength: action.payload,
    }))
    .addCase(setColumnsToShow, (state, action) => ({
      ...state,
      columnsToShow: action.payload,
    }))
    .addCase(setCurrentPageIndex, (state, action) => ({
      ...state,
      currentPageIndex: action.payload,
    }))
    .addCase(setCurrentUser, (state, action) => ({
      ...state,
      currentUser: action.payload,
    })),
)
