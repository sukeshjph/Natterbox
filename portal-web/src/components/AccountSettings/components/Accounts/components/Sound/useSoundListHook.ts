import { useEffect, useReducer } from "react"
import { useLazyQuery } from "@apollo/react-hooks"

import { ISound } from "./Sound.type"
import {
  setPageLength,
  setCurrentPageIndex,
  setColumnsToShow,
  removeError,
  setShowAddSound,
  setShowEditSound,
  setCurrentSound,
} from "./SoundActions"
import { GET_ALL_SOUND } from "./SoundQueries"
import { initialSoundListState, soundReducer } from "./SoundReducer"

export const useSoundListHook = () => {
  const [state, dispatch] = useReducer(soundReducer, initialSoundListState)

  const { pageLength, currentPageIndex } = state

  const [
    loadSound,
    {
      called: getAllSoundCalled,
      loading: soundListLoading,
      error: soundlistError,
      data: soundlistData,
      refetch,
    },
  ] = useLazyQuery(GET_ALL_SOUND, {
    variables: {
      index: currentPageIndex,
      length: pageLength,
    },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    loadSound()
  }, [])

  const handlePageSizeChange = event => {
    dispatch(setPageLength(event.target.value))
    loadSound()
  }

  const handlePageNavigation = (pageIndex: number) => () => {
    dispatch(setCurrentPageIndex(pageIndex))
    loadSound()
  }

  const handlePrefChange = (inputCols: IColType<ISound>[]) =>
    dispatch(setColumnsToShow(inputCols))

  const handleAddSoundChange = (value: boolean) =>
    dispatch(setShowAddSound(value))

  const handleEditSoundChange = (value: boolean) => {
    dispatch(setShowEditSound(value))
  }

  const handleSetCurrentSound = ({
    id,
    description,
    tag,
  }: Pick<ISound, "id" | "tag" | "description">) =>
    dispatch(
      setCurrentSound({
        id,
        description,
        tag,
      }),
    )

  const handleRemoveError = () => dispatch(removeError())

  return {
    handlePrefChange,
    handlePageNavigation,
    handlePageSizeChange,
    getAllSoundCalled,
    soundListLoading,
    soundlistError,
    soundlistData,
    refetch,
    state,
    handleRemoveError,
    handleAddSoundChange,
    handleEditSoundChange,
    handleSetCurrentSound,
  }
}
