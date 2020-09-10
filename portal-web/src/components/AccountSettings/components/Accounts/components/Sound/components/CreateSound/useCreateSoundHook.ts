import { useSapienProxyData } from "hooks"
import { useRef } from "react"
import useThunkReducer from "react-hook-thunk-reducer"
import {
  setAddSoundState,
  removeError,
  setError,
  uploadWavFile,
} from "./CreateSoundActions"

import {
  initialCreateSoundState,
  createSoundReducer,
} from "./CreateSoundReducer"

type OwnProps = {
  closeDialog: () => void
  refetch: () => void
}
export const useCreateSoundHook = ({ refetch, closeDialog }: OwnProps) => {
  const localError = useRef("")

  const [state, dispatch] = useThunkReducer(
    createSoundReducer,
    initialCreateSoundState,
  )

  const { orgId, sapienUrl, userToken } = useSapienProxyData()

  const validateSoundFile = event => {
    const { files } = event.target
    const extension = files[0].name.split(".").pop()
    const fileSize = files[0].size / 1024 / 1024

    if (extension !== "wav") {
      localError.current = "Invalid audio file extension"
      // eslint-disable-next-line no-param-reassign
      event.target = null
      return false
    }

    if (fileSize > 12.5) {
      localError.current = "File size exceeds 12.5 MB"
      // eslint-disable-next-line no-param-reassign
      event.target = null
      return false
    }

    return true
  }

  const updateField = (key: string) => e => {
    if (key === "file") {
      if (validateSoundFile(e)) {
        dispatch(
          setAddSoundState({
            file: e.target.files[0],
            filePath: e.target.value,
          }),
        )
      } else {
        dispatch(setError(localError.current))
      }
    } else {
      dispatch(setAddSoundState({ [key]: e.target.value }))
    }
  }

  const handleRemoveError = () => dispatch(removeError())

  const handleWavUpload = async () => {
    dispatch(
      uploadWavFile({
        url: `${sapienUrl}/organisation/${orgId}/sound`,
        userToken: userToken!,
        refetch,
        closeDialog,
      }),
    )
  }

  return {
    state,
    handleRemoveError,
    updateField,
    handleWavUpload,
  }
}
