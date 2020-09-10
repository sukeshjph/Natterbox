import { createReducer } from "@reduxjs/toolkit"
import {
  setPageLength,
  setCurrentPageIndex,
  setGroupMembersCache,
  setGroupMemberToAdd,
  setGroupMemberToRemove,
  setGroupMembersLoading,
  resetGroupMembersToRemove,
  setCurrentMemberOperation,
} from "./GroupMemberActions"

export const pagerOptions = [20, 40, 60, 80]

export const initialState = {
  pageLength: pagerOptions[0],
  currentPageIndex: 0,
  membersCache: {},
  membersToAdd: [] as number[],
  membersToRemove: [] as number[],
  membersLoading: false,
  currentMemberOperation: "",
}

export const userReducer = createReducer(initialState, builder =>
  builder
    .addCase(setPageLength, (state, action) => ({
      ...state,
      pageLength: action.payload,
    }))
    .addCase(setCurrentPageIndex, (state, action) => ({
      ...state,
      currentPageIndex: action.payload,
    }))
    .addCase(setGroupMembersCache, (state, action) => ({
      ...state,
      membersCache: {
        ...state.membersCache,
        [action.payload.userId]: action.payload,
      },
    }))
    .addCase(setGroupMembersLoading, (state, action) => ({
      ...state,
      membersLoading: action.payload,
    }))
    .addCase(setGroupMemberToAdd, (state, action) => ({
      ...state,
      membersToAdd: [...state.membersToAdd, ...action.payload],
    }))
    .addCase(setGroupMemberToRemove, (state, action) => {
      const { type, userId } = action.payload
      return {
        ...state,
        membersToRemove:
          type === "remove"
            ? state.membersToRemove.filter(Id => Id !== userId)
            : [...state.membersToRemove, userId],
      }
    })
    .addCase(resetGroupMembersToRemove, state => {
      return {
        ...state,
        membersToRemove: [],
      }
    })
    .addCase(setCurrentMemberOperation, (state, action) => {
      return {
        ...state,
        currentMemberOperation: action.payload,
      }
    }),
)
