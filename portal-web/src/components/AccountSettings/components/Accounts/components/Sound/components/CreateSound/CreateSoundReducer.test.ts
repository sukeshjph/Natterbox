import {
  createSoundReducer,
  initialCreateSoundState,
} from "./CreateSoundReducer"

import { setAddSoundState, setFileUploading } from "./CreateSoundActions"

describe("CreateSound reducer", () => {
  it("should handle initial state", () => {
    expect(createSoundReducer(undefined, {})).toEqual(initialCreateSoundState)
  })

  it("should handle setFileUploading", () => {
    expect(
      createSoundReducer(initialCreateSoundState, setFileUploading(true)),
    ).toEqual({ ...initialCreateSoundState, uploadingFile: true })
  })

  it("should handle setAddSoundState", () => {
    expect(
      createSoundReducer(
        initialCreateSoundState,
        setAddSoundState({ tag: "testTag" }),
      ),
    ).toEqual({ ...initialCreateSoundState, tag: "testTag" })
  })
})
