import { createAction } from "@reduxjs/toolkit"
import { ISound } from "./Sound.type"

export const setError = createAction<string>("setError")
export const removeError = createAction("removeError")

export const setPageLength = createAction<number>("setPageLength")
export const setCurrentPageIndex = createAction<number>("setCurrentPageIndex")
export const setColumnsToShow = createAction<IColType<ISound>[]>(
  "setColumnsToShow",
)

export const setShowAddSound = createAction<boolean>("setShowAddSound")
export const setShowEditSound = createAction<boolean>("setShowEditSound")
export const setCurrentSound = createAction<
  Pick<ISound, "id" | "tag" | "description">
>("setCurrentSound")
