import React from "react"
import { shallow } from "enzyme"
import useGroupCreateHook from "./useGroupCreateHook"
import { GroupCreate } from "./GroupCreate"
import { grpMock } from "./mockFiles/grpCreateHook"
import { Loading } from "../../../shared"

jest.mock("./useGroupCreateHook")

describe("Create group component", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    useGroupCreateHook.mockClear()
  })

  afterEach(() => {
    useGroupCreateHook.mockRestore()
  })

  const wrapper = shallow(<GroupCreate closeDialog={() => undefined} />)

  it("Loading state", () => {
    // useGroupCreateHook.mockReturnValue({
    //   resetState: () => undefined,
    // })

    useGroupCreateHook.mockImplementationOnce(() => {
      return {
        ...grpMock,
        getAllGroupsLoading: true,
        getAllGroupsCalled: true,
      }
    })

    expect(wrapper.find(Loading)).toBeDefined()
  })

  it("save and create", () => {
    const handleSubmit = jest.fn()

    useGroupCreateHook.mockImplementation(() => {
      return {
        ...grpMock,
        handleSubmit,
      }
    })

    const newWrapper = shallow(<GroupCreate closeDialog={() => undefined} />)

    const groupSaveCreateButton = newWrapper.find(
      '[data-testid="groupSaveCreate"]',
    )

    groupSaveCreateButton.prop("onMouseDown")()
    expect(handleSubmit).toHaveBeenCalled()
  })
})
