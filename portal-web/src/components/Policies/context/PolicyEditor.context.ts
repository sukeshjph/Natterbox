import React from "react"
import { initialPolicyEditorState } from "../components/PoliciesReducer"

type Action = { type: string } | { type: string; payload: any }

export const PolicyEditorStateContext = React.createContext(
  initialPolicyEditorState,
)

export const PolicyEditorDispatchContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined)
