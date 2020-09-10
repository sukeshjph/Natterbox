import { useReducer } from "react"
import * as CreatePolicyActions from "./CreatePolicyActions"

import {
  policyCreateReducer,
  policyCreateInitialState,
} from "./CreatePolicyReducer"

type OwnProps = {
  closeDialog: () => void
  refetch: () => void
}
export const useCreatePolicyHook = () => {
  const [state, dispatch] = useReducer(
    policyCreateReducer,
    policyCreateInitialState,
  )

  const handleRemoveError = () => dispatch(CreatePolicyActions.removeError())

  return {
    state,
    handleRemoveError,
  }
}
