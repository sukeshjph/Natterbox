import { useState, useReducer, useEffect, useMemo } from "react"

import { isNil } from "ramda"
import { useMutation } from "@apollo/react-hooks"
import { INumber } from "../Number.type"
import { UPDATE_NUMBER, DELETE_NUMBER } from "../NumberQueries"
import { numberUpdateReducer, initialUpdateNumberState } from "../NumberReducer"

import {
  setLabel,
  setUserId,
  setUsersDropdown,
  setReloadUsers,
  setUsersLoading,
  setErrorSnack,
} from "../NumberActions"

type OwnProps = {
  closeDialog: () => void
  number: INumber
  refetchNumbers: () => void
}

export const useNumberUpdateHook = ({
  closeDialog,
  number,
  refetchNumbers,
}: OwnProps) => {
  const cantDelete = useMemo(() => !number.userId, [number])
  const [state, dispatch] = useReducer(
    numberUpdateReducer,
    initialUpdateNumberState,
  )

  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("")
  const {
    reloadUsers,
    usersDropdown,
    usersLoading,
    errorSnack,
    label,
    userId,
  } = state

  const [
    updateNumber,
    { loading: numberUpdateLoading, data: updatedNumberData, error },
  ] = useMutation(UPDATE_NUMBER, {
    onCompleted() {
      refetchNumbers()
      if (usersDropdown) {
        dispatch(setReloadUsers()) // Reload users after number update
      }
    },
  })

  const [deleteNumber, { loading: numberDeleteLoading }] = useMutation(
    DELETE_NUMBER,
    {
      onCompleted(data) {
        refetchNumbers()
        setDeleteSuccessMessage(data.deleteNumber.message)
        setShowMessageDialog(true)
        if (usersDropdown) {
          dispatch(setReloadUsers()) // Reload users after number deleted
        }
      },
    },
  )
  const handleCloseMessageDialog = () => {
    setShowMessageDialog(false)
    closeDialog()
  }

  useEffect(() => {
    // if policyId not present then loadUsers
    if (isNil(number.policyId)) {
      dispatch(setUsersDropdown(true))
      dispatch(setUsersLoading(true))
    }
    if (!isNil(number.label)) {
      dispatch(setLabel(number.label))
    }
  }, [])

  useEffect(() => {
    // if policyId not present then loadUsers
    if (isNil(number.policyId)) {
      dispatch(setReloadUsers())
    }
    if (!isNil(number.label)) {
      dispatch(setLabel(number.label))
    }
  }, [number]) // whenever number is updated

  // #endregion

  // Send Mutation to API
  const submitHandler = () => {
    updateNumber({
      variables: {
        id: number.number,
        number: {
          label,
          ...(userId && { userId }),
        },
      },
    }).catch(() => {})
  }

  // For deleting the number -- moved to customhook
  const handleDeleteNumber = () => {
    deleteNumber({
      variables: {
        number: number.number,
        countryCode: number.countryCode,
      },
    }).catch(() => {})
    setShowDeleteConfirmDialog(false)
  }

  return {
    cantDelete,
    error,
    errorSnack,
    setErrorSnack: (status: boolean) => dispatch(setErrorSnack(status)),
    submitHandler,
    usersDropdown,
    reloadUsers,
    handleUsersLoaded: () => dispatch(setUsersLoading(false)),
    handleUserChange: (userOption: any) =>
      dispatch(setUserId(userOption && userOption.value)),

    label,
    handleOnLabelChange: (e: any) => dispatch(setLabel(e.target.value)),
    numberUpdateLoading,
    usersLoading,
    updatedNumberData,

    handleDeleteNumber,
    promptDeleteConfirmDialog: () => setShowDeleteConfirmDialog(true),
    numberDeleteLoading,
    showDeleteConfirmDialog,
    showMessageDialog,
    deleteSuccessMessage,
    dismissDeleteConfirmDialog: () => setShowDeleteConfirmDialog(false),
    handleCloseMessageDialog,
  }
}
