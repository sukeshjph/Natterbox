import { useEffect, useState, useReducer } from "react"
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import {
  initialPolicyEditorState,
  initialPolicyState,
  policiesEditorReducer,
} from "../PoliciesReducer"
import { CREATE_POLICY, GET_POLICY_BY_ID } from "../PoliciesQueries"
import {
  setPolicy,
  setPolicyLayout,
  setPolicyOptionsOpen,
} from "../PoliciesActions"
import { PolicyType, PolicyOptionsType } from "../Policies.type"

export const useMutablePolicyEditorHooks = ({ policyId }) => {
  const [isNewPolicy, setIsNewPolicy] = useState(policyId === "new")
  const [state, dispatch] = useReducer(
    policiesEditorReducer,
    initialPolicyEditorState,
  )

  const [mutablePolicy, setMutablePolicy] = useState<PolicyType | null>(null)

  const setPolicyToEdit = (policy: PolicyType | null) => {
    dispatch(setPolicy(policy))
    dispatch(setPolicyLayout(policy))
    setMutablePolicy(policy)
  }

  const [
    loadPolicy,
    { called, loading, error: loadPolicyError, data },
  ] = useLazyQuery(GET_POLICY_BY_ID)

  useEffect(() => {
    if (policyId === "new") {
      setIsNewPolicy(true)
      setPolicyToEdit(initialPolicyState)
    } else {
      setIsNewPolicy(false)
      setPolicyToEdit(null)
      loadPolicy({
        variables: {
          id: policyId,
        },
      })
    }
  }, [policyId])

  useEffect(() => {
    if (isNewPolicy) {
      dispatch(setPolicyOptionsOpen(true))
    }
  }, [isNewPolicy])

  useEffect(() => {
    if (!data) {
      return
    }
    setPolicyToEdit(data.policy)
  }, [data])

  const [
    // eslint-disable-next-line no-unused-vars
    createPolicy,
    {
      loading: mutationLoading,
      data: createdPolicyData,
      error: createPolicyError,
    },
  ] = useMutation(CREATE_POLICY)

  const updatePolicyOptions = (
    policyOptions: PolicyOptionsType,
    onSuccess: (boolean) => void | undefined,
  ) => {
    if (policyOptions.name === null || policyOptions.name === "") {
      if (onSuccess) {
        onSuccess(false)
      }
      return
    }
    if (mutablePolicy) {
      setMutablePolicy({
        ...mutablePolicy,
        name: policyOptions.name,
        type: policyOptions.type,
        enabled: policyOptions.enabled,
      })
    }
    if (onSuccess) {
      onSuccess(true)
    }
  }

  // TODO: This button could be enabled / disabled depending on the equality of the state & mutableEditorState
  const handleSaveClick = () => {
    if (isNewPolicy) {
      createPolicy({
        variables: {
          policyInput: mutablePolicy,
        },
      }).catch(() => {})
    } else {
      dispatch(setPolicy(mutablePolicy))
    }
  }

  const onUpdate = modifiedItem => {
    if (mutablePolicy === null) {
      return
    }
    const newState: PolicyType = {
      ...mutablePolicy,
      items: mutablePolicy
        ? mutablePolicy.items.map(item => ({
            ...(item.id === modifiedItem.id ? modifiedItem : item),
            subItems:
              item.subItems &&
              item.subItems.map(subItem =>
                subItem.id === modifiedItem.id ? modifiedItem : subItem,
              ),
          }))
        : [],
    }
    setMutablePolicy(newState)
  }

  // TODO: Replace policyHeader with global breadcrumb component
  return {
    state: {
      ...state,
      policy: mutablePolicy,
    },
    dispatch,
    policyId,
    isNewPolicy,
    mutationLoading,
    updatePolicyOptions,
    handleSaveClick,
    createdPolicyData,
    createPolicyError,
    onUpdate,
    showPolicyView: called && !loading && !loadPolicyError && !isNewPolicy,
  }
}
