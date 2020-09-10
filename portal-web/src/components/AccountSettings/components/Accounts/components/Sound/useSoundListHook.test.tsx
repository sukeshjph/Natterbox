/* eslint-disable import/no-extraneous-dependencies */
import React, { FunctionComponent } from "react"
import { renderHook } from "@testing-library/react-hooks"
import { MockedProvider } from "@apollo/react-testing"
// import waitForExpect from "wait-for-expect"
import { useSoundListHook } from "./useSoundListHook"
import { GET_ALL_SOUND } from "./SoundQueries"

import { soundMockList } from "./mocks/soundMocks"

const getMockResponse = ({ pageLength, currentPageIndex }) => {
  return [
    {
      request: {
        query: GET_ALL_SOUND,
        variables: {
          index: currentPageIndex,
          length: pageLength,
        },
      },
      result: () => {
        return {
          data: soundMockList,
        }
      },
    },
  ]
}

const getWrapper = ({ pageLength, currentPageIndex }) => ({ children }) => {
  const mockResponse = getMockResponse({ pageLength, currentPageIndex })

  return (
    <MockedProvider mocks={mockResponse} addTypename={false}>
      {children}
    </MockedProvider>
  )
}

describe("useSoundListHook", () => {
  it("SoundList loading", async () => {
    const wrapper = getWrapper({
      pageLength: 100,
      currentPageIndex: 0,
    }) as FunctionComponent<{}>

    const { result } = renderHook(() => useSoundListHook(), { wrapper })
    expect(result.current.soundListLoading).toBeTruthy()
  })

  it("SoundList loaded", async () => {
    const wrapper = getWrapper({
      pageLength: 100,
      currentPageIndex: 0,
    }) as FunctionComponent<{}>

    const { result, waitForNextUpdate } = renderHook(() => useSoundListHook(), {
      wrapper,
    })

    // Wait for async graphql query to resolve in MockProvider
    await waitForNextUpdate()

    expect(result.current.soundListLoading).toBeFalsy()
    expect(result.current.soundlistData).toEqual(soundMockList)
  })

  it("Soundlist error", async () => {
    const errorResponse = [
      {
        ...getMockResponse({
          pageLength: 100,
          currentPageIndex: 0,
        })[0],
        error: new Error("aw shucks"),
      },
    ]

    const wrapper: FunctionComponent<{
      children: React.ReactElement
    }> = ({ children }) => (
      <MockedProvider mocks={errorResponse} addTypename={false}>
        {children}
      </MockedProvider>
    )

    const { result, waitForNextUpdate } = renderHook(() => useSoundListHook(), {
      wrapper,
    })

    await waitForNextUpdate()

    expect(result.current.soundListLoading).toBeFalsy()
    expect(result.current.soundlistError).toBeTruthy()
  })
})

// await wait(0)
// await new Promise(resolve => setTimeout(resolve, 0))
// await waitForExpect(() => {
//   expect(result.current.soundListLoading).toBeFalsy()
// })
