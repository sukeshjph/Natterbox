import { useReducer } from "react"
import { pluck, uniq } from "ramda"
import { useMutation, useQuery } from "@apollo/react-hooks"
import {
  groupReducer,
  initialState,
  groupInitialState,
} from "./GroupCreateReducer"
import { CREATE_GROUP, GET_ALL_GROUPS } from "../GroupsQueries"
import {
  setErrorSnack,
  setGroupState,
  setSubmitType,
  setCategories,
} from "./GroupCreateActions"

const useGroupCreateHook = (closeDialog: () => void) => {
  const [state, dispatch] = useReducer(groupReducer, initialState)

  const { called, loading, error, data } = useQuery(GET_ALL_GROUPS, {
    onCompleted(getGrpData) {
      if (getGrpData) {
        const getCategory = pluck("category")
        handleSetCategories(uniq(getCategory(getGrpData.groups)))
      }
    },
  })

  const [
    createGroup,
    { loading: mutationLoading, data: createdGroupData },
  ] = useMutation(CREATE_GROUP, {
    onCompleted() {
      if (state.submitType === 1) {
        resetState()
      } else if (state.submitType === 2) {
        resetState()
        closeDialog()
      }
    },
  })

  const updateField = e => {
    if (e.target.type === "checkbox") {
      dispatch(
        setGroupState({
          [e.target.name]: e.target.checked,
        }),
      )
    }
    dispatch(
      setGroupState({
        [e.target.name]: e.target.value === "" ? null : e.target.value,
      }),
    )
  }

  const submitHandler = () => {
    createGroup({
      variables: {
        ...state.groupState,
      },
    }).catch(() => {})
  }

  const setError = (value: boolean) => dispatch(setErrorSnack(value))

  const handleSubmit = (type: 1 | 2) => dispatch(setSubmitType(type))

  const handleErrorClose = () => dispatch(setErrorSnack(true))

  const handleSetCategories = categories => dispatch(setCategories(categories))

  const resetState = () => dispatch(setGroupState(groupInitialState))

  return {
    mutationLoading,
    createdGroupData,
    getAllGroupsCalled: called,
    getAllGroupsLoading: loading,
    getGroupsError: error,
    getGroupsData: data,
    state,
    updateField,
    submitHandler,
    handleSubmit,
    setError,
    handleErrorClose,
    handleSetCategories,
    resetState,
  }
}

export default useGroupCreateHook
