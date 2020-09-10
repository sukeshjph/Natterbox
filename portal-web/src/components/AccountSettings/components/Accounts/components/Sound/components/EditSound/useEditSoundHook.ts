/* eslint-disable no-param-reassign */
import { useRef } from "react"
import { useSapienProxyData } from "hooks"
import useThunkReducer from "react-hook-thunk-reducer"
import * as EditSoundActions from "./EditSoundActions"
import { ISound, EditSound } from "../../Sound.type"

import { initialEditSoundState, editSoundReducer } from "./EditSoundReducer"

type OwnProps = {
  closeDialog: () => void
  refetch: () => void
  currentSound: Pick<ISound, "id" | "tag" | "description">
}

export const useEditSoundHook = ({ currentSound, refetch, closeDialog }) => {
  const [state, dispatch] = useThunkReducer(editSoundReducer, {
    ...initialEditSoundState,
    tag: currentSound.tag,
    description: currentSound.description,
  } as EditSound)

  const { orgId, sapienUrl, userToken } = useSapienProxyData()

  const localError = useRef("")

  const validateSoundFile = event => {
    const { files } = event.target
    const extension = files[0].name.split(".").pop()
    const fileSize = files[0].size / 1024 / 1024

    if (extension !== "wav") {
      localError.current = "Invalid audio file extension"

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
    if (key === "uploadedFile") {
      if (validateSoundFile(e)) {
        dispatch(
          EditSoundActions.setEditSoundState({
            uploadedFile: e.target.files[0],
            uploadedFilePath: e.target.value,
          }),
        )
      } else {
        dispatch(EditSoundActions.setError(localError.current))
      }
    } else {
      dispatch(EditSoundActions.setEditSoundState({ [key]: e.target.value }))
    }
  }

  const handleRemoveError = () => dispatch(EditSoundActions.removeError())

  const handleSoundFileUpdate = async () => {
    dispatch(
      EditSoundActions.updateSoundFileWithProps({
        url: `${sapienUrl}/organisation/${orgId}/sound/${currentSound.id}`,
        userToken: userToken!,
        refetch,
        closeDialog,
      }),
    )
  }

  const handleSoundFilDownload = () => {
    dispatch(
      EditSoundActions.downloadWavFile({
        url: `${sapienUrl}/organisation/${orgId}/sound/${currentSound.id}`,
        userToken: userToken!,
        soundId: currentSound.id,
      }),
    )
  }

  const handleDeleteSound = (choice: string) => () => {
    if (choice === "Disagree") {
      handleDeleteDialog(false)
    } else {
      handleDeleteDialog(false)
      dispatch(
        EditSoundActions.deleteSound({
          url: `${sapienUrl}/organisation/${orgId}/sound/${currentSound.id}`,
          userToken: userToken!,
          refetch,
          closeDialog,
        }),
      )
    }
  }

  const handleDeleteDialog = (value: boolean) =>
    dispatch(EditSoundActions.setDeleteDialog(value))

  const clearSuccessMessage = () =>
    dispatch(EditSoundActions.setSuccessMessage(""))

  return {
    state,
    handleRemoveError,
    updateField,
    handleSoundFileUpdate,
    clearSuccessMessage,
    handleSoundFilDownload,
    handleDeleteSound,
    handleDeleteDialog,
  }
}
