import { useState, useEffect } from "react"
import { PolicyOptionsType } from "../Policies.type"
import { initialPolicyOptionsState } from "../PoliciesReducer"

export const useMutablePolicyOptionsHooks = (
  policyOptions: PolicyOptionsType,
) => {
  const [mutablePolicyOptions, setMutablePolicyOptions] = useState(
    policyOptions || initialPolicyOptionsState,
  )

  useEffect(() => {
    setMutablePolicyOptions(policyOptions || initialPolicyOptionsState)
  }, [policyOptions])

  const onChangeName = (name: string) => {
    setMutablePolicyOptions({
      ...mutablePolicyOptions,
      name,
    })
  }

  const onChangeType = (type: string) => {
    setMutablePolicyOptions({
      ...mutablePolicyOptions,
      type,
    })
  }

  const onChangeEnabledState = (enabled: boolean) => {
    setMutablePolicyOptions({
      ...mutablePolicyOptions,
      enabled,
    })
  }

  return {
    policyOptions: mutablePolicyOptions,
    onChangeName,
    onChangeType,
    onChangeEnabledState,
  }
}
