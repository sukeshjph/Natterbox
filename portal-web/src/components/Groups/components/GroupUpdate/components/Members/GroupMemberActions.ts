import { createAction } from "@reduxjs/toolkit"

const actions = {
  SETPAGELENGTH: "setPageLength",
  SETCURRENTPAGEINDEX: "setCurrentPageIndex",
  SETGROUPMEMBERSCACHE: "setGroupMembersCache",
  SETMEMBERTOADD: "setGroupMemberToAdd",
  SETGROUPMEMBERSLOADING: "setGroupMembersLoading",
  SETGROUPMEMBERSTOREMOVE: "setGroupMembersToRemove",
  RESETGROUPMEMBERSTOREMOVE: "resetGroupMembersToRemove",
  SETCURRENTMEMBEROPERATION: "setCurrentMemberOperation",
}

export const setPageLength = createAction<number>(actions.SETPAGELENGTH)

export const setCurrentPageIndex = createAction<number>(
  actions.SETCURRENTPAGEINDEX,
)

type TCache = {
  [key: string]: any
}

export const setGroupMembersCache = createAction<TCache>(
  actions.SETGROUPMEMBERSCACHE,
)

export const setGroupMemberToAdd = createAction<number[]>(
  actions.SETMEMBERTOADD,
)

export const setGroupMemberToRemove = createAction<{
  userId: number
  type: "remove" | "add"
}>(actions.SETGROUPMEMBERSTOREMOVE)

export const resetGroupMembersToRemove = createAction(
  actions.RESETGROUPMEMBERSTOREMOVE,
)

export const setCurrentMemberOperation = createAction<string>(
  actions.SETCURRENTMEMBEROPERATION,
)

export const setGroupMembersLoading = createAction<boolean>(
  actions.SETGROUPMEMBERSLOADING,
)
