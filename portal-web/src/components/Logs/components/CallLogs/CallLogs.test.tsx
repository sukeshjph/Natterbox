import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
// import waitForExpect from "wait-for-expect"
import wait from "waait"
import { GET_CALL_LOGS } from "./CallLogQueries"
import { CallLogResponse } from "../../../../mocks"
import { CallLogs } from "./CallLogs"

const mocks = [
  {
    request: {
      query: GET_CALL_LOGS,
    },
    result: CallLogResponse,
  },
]

describe("CallLogs", () => {
  let wrapper

  it("Loading Calllog data", () => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CallLogs />
      </MockedProvider>,
    )

    expect(wrapper.find('[data-testid="loadingSpinner"]')).toBeTruthy()
  })

  it("should render CallLogs when loading finished", async () => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CallLogs />
      </MockedProvider>,
    )

    await wait(0)

    expect(wrapper.find('[data-testid="CallLogs"]')).toBeTruthy()
    expect(
      Object.keys(wrapper.find('[data-testid="loadingSpinner"]')).length,
    ).toBe(0)
  })

  it("Error state", async () => {
    const mockWithError = [
      {
        request: {
          query: GET_CALL_LOGS,
        },
        error: new Error("Fetching Call Log error"),
      },
    ]

    wrapper = mount(
      <MockedProvider mocks={mockWithError} addTypename={false}>
        <CallLogs />
      </MockedProvider>,
    )

    await wait(0)

    expect(wrapper.find('[data-testid="CallLogError"]')).toBeDefined()
    expect(
      Object.keys(wrapper.find('[data-testid="loadingSpinner"]')).length,
    ).toBe(0)
  })
})
