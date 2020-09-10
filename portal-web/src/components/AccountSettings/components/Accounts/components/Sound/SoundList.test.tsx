import React from "react"
import {
  render,
  cleanup,
  findByTestId,
  getByTestId,
  fireEvent,
} from "@testing-library/react"
import waitForExpect from "wait-for-expect"
import { MockedProvider } from "@apollo/react-testing"
import wait from "waait"

import { SoundList } from "./SoundList"
import { GET_ALL_SOUND } from "./SoundQueries"

const mockSoundArray = [
  {
    id: 104888,
    tag: "Wavtest",
    description: "wavtest",
    size: 2146166,
    created: "2020-07-31T13:43:30+00:00",
    modified: "2020-07-31T13:43:30+00:00",
  },
  {
    id: 104886,
    tag: "Wav",
    description: "WAV",
    size: 109804,
    created: "2020-07-31T13:33:23+00:00",
    modified: "2020-07-31T13:33:23+00:00",
  },
  {
    id: 105614,
    tag: "Sound20200804104125192442",
    description: "Test WAV file",
    size: 46,
    created: "2020-08-04T10:41:25+00:00",
    modified: "2020-08-04T10:41:25+00:00",
  },
  {
    id: 104887,
    tag: "Smoketest",
    description: "Smoketest",
    size: 386604,
    created: "2020-07-31T13:36:09+00:00",
    modified: "2020-07-31T13:36:09+00:00",
  },
]

const refetch = jest.fn()

const mocks = [
  {
    request: {
      query: GET_ALL_SOUND,
      variables: {
        index: 0,
        length: 100,
      },
    },
    result: {
      data: {
        soundPaginated: {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 1,
          sound: mockSoundArray,
        },
      },
    },
    refetch,
    newData: () => ({
      data: {
        soundPaginated: {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 1,
          sound: mockSoundArray.map(sound => ({
            ...sound,
            tag: `${sound.tag}_refetched`,
          })),
        },
      },
    }),
  },
]

describe("Sound", () => {
  afterEach(cleanup)

  it.skip("Sound List loading", async () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SoundList />
      </MockedProvider>,
    )

    // screen.debug(container) --> Use this to check the html(like enzyme debug())

    expect(getByTestId(container, "loadingSpinner")).toBeDefined()
  })

  describe.skip("Soundlist loaded", () => {
    let main
    let tableContainer

    beforeAll(async () => {
      main = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <SoundList />
        </MockedProvider>,
      )

      await wait(0)
      const { container } = main
      tableContainer = await findByTestId(container, "soundListContainer")
    })

    it("Table container", async () => {
      expect(tableContainer).toBeTruthy()
    })

    it("Soundlist sorted", async () => {
      // screen.debug()
      const inputTagArray = mockSoundArray
        .sort((a, b) => a.tag.localeCompare(b.tag))
        .map(element => element.tag)

      expect(
        tableContainer.querySelector("tbody tr").querySelectorAll("td")[2]
          .textContent,
      ).toBe(inputTagArray[0])

      // await waitForExpect(() => expect(findAllBy("tr")).toBeDefined())
    })

    it("Refresh Soundlist", async () => {
      // screen.debug()
      const { container } = main
      const refreshBtn = tableContainer.querySelector(
        "[data-testid='refreshBtn']",
      )
      fireEvent.click(refreshBtn)

      // expect(refetch).toHaveBeenCalled()

      await waitForExpect(() =>
        expect(findByTestId(container, "loadingSpinner")).toBeDefined(),
      )
    })
  })
})

// import React from "react"
// import { shallow } from "enzyme"
// import useGroupCreateHook from "./useGroupCreateHook"
// import { GroupCreate } from "./GroupCreate"
// import { grpMock } from "./mockFiles/grpCreateHook"
// import { Loading } from "../../../shared"

// jest.mock("./useGroupCreateHook")

// describe("Create group component", () => {
//   beforeEach(() => {
//     // Clear all instances and calls to constructor and all methods:
//     useGroupCreateHook.mockClear()
//   })

//   afterEach(() => {
//     useGroupCreateHook.mockRestore()
//   })

//   const wrapper = shallow(<GroupCreate closeDialog={() => undefined} />)

//   it("Loading state", () => {
//     // useGroupCreateHook.mockReturnValue({
//     //   resetState: () => undefined,
//     // })

//     useGroupCreateHook.mockImplementationOnce(() => {
//       return {
//         ...grpMock,
//         getAllGroupsLoading: true,
//         getAllGroupsCalled: true,
//       }
//     })

//     expect(wrapper.find(Loading)).toBeDefined()
//   })

//   it("save and create", () => {
//     const handleSubmit = jest.fn()

//     useGroupCreateHook.mockImplementation(() => {
//       return {
//         ...grpMock,
//         handleSubmit,
//       }
//     })

//     const newWrapper = shallow(<GroupCreate closeDialog={() => undefined} />)

//     const groupSaveCreateButton = newWrapper.find(
//       '[data-testid="groupSaveCreate"]',
//     )

//     groupSaveCreateButton.prop("onMouseDown")()
//     expect(handleSubmit).toHaveBeenCalled()
//   })
// })
