import { useReducer, useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { setCreateUserState } from "../../UserActions"
import { userCreateReducer, userCreateState } from "./UserCreateReducer"
import { CREATE_USER } from "../../UserQueries"
import { usePhoneNumberValidationHook } from "../common/usePhoneNumberValidationHook"

type OwnProps = {
  closeDialog: () => void
  refreshData: () => void
}

const useUserCreateHook = ({ closeDialog, refreshData }: OwnProps) => {
  const [state, dispatch] = useReducer(userCreateReducer, userCreateState)
  const [saveType, setSaveType] = useState<"SaveCreate" | "SaveClose" | "">("")

  const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
    onCompleted() {
      refreshData()

      if (saveType === "SaveClose") {
        closeDialog()
      }

      if (saveType === "SaveCreate") {
        dispatch(setCreateUserState(userCreateState))
      }
    },
  })

  usePhoneNumberValidationHook()

  const updateField = (fieldType: string) => e => {
    if (fieldType === "enabled") {
      dispatch(
        setCreateUserState({
          enabled: e.target.value === "Active",
        }),
      )
    } else {
      dispatch(
        setCreateUserState({
          [fieldType]: e.target.value,
        }),
      )
    }
  }

  const onSubmitHandler = () =>
    createUser({
      variables: {
        user: {
          ...state,
        },
      },
    })

  const handleUserAdd = type => setSaveType(type)

  return {
    creatingUser,
    state,
    updateField,
    onSubmitHandler,
    handleUserAdd,
    saveType,
  }
}

export default useUserCreateHook
