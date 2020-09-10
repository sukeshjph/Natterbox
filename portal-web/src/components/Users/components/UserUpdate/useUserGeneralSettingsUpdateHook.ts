import { useEffect, useReducer, useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useAuth0 } from "plugins/auth0"
import { omit, pluck } from "ramda"
import { getDecodedTokenValues, getUserId } from "../../../../util"
import {
  GET_USER_DETAILS,
  UPDATE_USER,
  DELETE_USER,
  GET_DEVICES,
} from "../../UserQueries"

import {
  setUserDetailsUpdateState,
  setDevices,
  setDevicesCache,
} from "../../UserActions"
import { userDetailsReducer, userDetailsUpdateState } from "./UserUpdateReducer"
import { usePhoneNumberValidationHook } from "../common/usePhoneNumberValidationHook"

type OwnProps = {
  userId: number
  refetchUsers: () => void
  closeDialog: () => void
}

const useUserGeneralSettingsUpdateHook = ({
  userId,
  refetchUsers,
  closeDialog,
}: OwnProps) => {
  const [errorSnack, setErrorSnack] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const { userToken } = useAuth0()
  const currentUserId = getUserId(getDecodedTokenValues(userToken!))

  const { data: devicesData } = useQuery(GET_DEVICES, {
    fetchPolicy: "network-only",
  })

  const { loading: userLoading, error: userLoadingError, data } = useQuery(
    GET_USER_DETAILS,
    {
      variables: { userId },
      fetchPolicy: "network-only",
    },
  )
  const [state, dispatch] = useReducer(
    userDetailsReducer,
    userDetailsUpdateState,
  )

  const [updateUser, { loading: updatingUser }] = useMutation(UPDATE_USER, {
    onCompleted(usrData) {
      dispatch(setUserDetailsUpdateState(usrData.updateUser))
      refetchUsers()
      closeDialog()
    },
  })

  const [deleteUser, { loading: deletingUser }] = useMutation(DELETE_USER, {
    onCompleted() {
      refetchUsers()
      closeDialog()
    },
  })

  useEffect(() => {
    if (devicesData && devicesData.devices) {
      const { devices } = devicesData

      dispatch(setDevices(devices))
    }
  }, [devicesData])

  useEffect(() => {
    if (data && data.user) {
      dispatch(
        setUserDetailsUpdateState(omit(["__typename", "userId"], data.user)),
      )
    }
  }, [data])

  usePhoneNumberValidationHook()

  const updateField = (fieldType: string) => e => {
    if (fieldType === "enabled") {
      dispatch(
        setUserDetailsUpdateState({
          enabled: e.target.value === "Active",
        }),
      )
    } else {
      dispatch(
        setUserDetailsUpdateState({
          [fieldType]: e.target.value,
        }),
      )
    }
  }

  const onSubmitHandler = async () => {
    const deviceIDsStrings = pluck("id", state.devicesCache)
    const deviceIDs = deviceIDsStrings.map(deviceID => parseInt(deviceID, 10))

    updateUser({
      variables: {
        id: userId,
        user: {
          ...omit(["__typename", "userId"], {
            ...state.user,
            sipDevices: [...deviceIDs],
          }),
        },
      },
    })
  }

  const handleDeleteUser = (choice: string) => () => {
    if (choice === "Disagree") {
      setDeleteDialog(false)
    } else {
      setDeleteDialog(false)
      deleteUser({
        variables: {
          userId: parseInt(userId.toString(), 10),
        },
      })
    }
  }

  const updateDevicesCache = value => {
    dispatch(setDevicesCache(value))
  }

  const handleDeleteDialog = (value: boolean) => setDeleteDialog(value)

  const handleDeleteClick = () => setDeleteDialog(true)

  const resetForm = () => dispatch(setUserDetailsUpdateState(data.user))

  return {
    updateDevicesCache,
    updatingUser,
    state,
    userLoading,
    userLoadingError,
    updateField,
    onSubmitHandler,
    errorSnack,
    setErrorSnack,
    resetForm,
    handleDeleteUser,
    handleDeleteClick,
    deletingUser,
    deleteDialog,
    handleDeleteDialog,
    currentUserId,
  }
}

export default useUserGeneralSettingsUpdateHook
