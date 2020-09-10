/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { renderHook } from "@testing-library/react-hooks"
import { MockedProvider } from "@apollo/react-testing"
import useGroupCreateHook from "./useGroupCreateHook"
import { GET_ALL_GROUPS } from "../GroupsQueries"

describe("userGroupCreateHook", () => {
  const mocks = [
    {
      request: { query: GET_ALL_GROUPS },
      result: {
        data: [
          {
            id: "2126916",
            sipExtension: "5999",
            name: "Mohan QA",
            system: false,
            category: "cloudpbx",
          },
          {
            id: "2126957",
            sipExtension: "4000",
            name: "!Mohan QA 1#",
            system: false,
            category: "test",
          },
          {
            id: "2839834",
            sipExtension: "2500",
            name: "asd test",
            system: false,
            category: "asd",
          },
          {
            id: "2839863",
            sipExtension: "2340",
            name: "ter",
            system: false,
            category: "asd",
          },
          {
            id: "2839884",
            sipExtension: "6000",
            name: "wer",
            system: false,
            category: "asd",
          },

          {
            id: "2101648",
            sipExtension: null,
            name: "All",
            system: true,
            category: null,
          },
          {
            id: "2101645",
            sipExtension: null,
            name: "All Users",
            system: true,
            category: null,
          },
          {
            id: "2101646",
            sipExtension: "3004",
            name: "All SIP Devices",
            system: true,
            category: null,
          },
        ],
      },
    },
  ]

  const wrapper = ({ children }) => (
    <MockedProvider mocks={mocks}>{children}</MockedProvider>
  )

  it("Get Grpups data loading", () => {
    const { result } = renderHook(() => useGroupCreateHook(() => undefined), {
      wrapper,
    })

    expect(result.current.getAllGroupsLoading).toBeTruthy()
  })

  it("Get Grpups data loaded", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGroupCreateHook(() => undefined),
      {
        wrapper,
      },
    )

    await waitForNextUpdate()
    expect(result.current.getAllGroupsLoading).toBeFalsy()
  })
})
