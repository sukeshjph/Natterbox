import React from "react"
import {
  render,
  getByTestId,
  screen,
  queryByTestId,
} from "@testing-library/react"
import { MockedProvider } from "@apollo/react-testing"
import wait from "waait"
// import waitForExpect from "wait-for-expect"
import "@testing-library/jest-dom/extend-expect"
import { DeviceList } from "./DeviceList"
import { DeviceListMock } from "../../../mocks"
import { GET_ALL_DEVICES } from "./DeviceQueries"

const deviceListResponse = [
  {
    request: {
      query: GET_ALL_DEVICES,
    },
    result: DeviceListMock,
  },
]

describe("Device List", () => {
  it("Device List loading", async () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DeviceList />
      </MockedProvider>,
    )

    // screen.debug(container) --> Use this to check the html(like enzyme debug())

    expect(getByTestId(container, "loadingSpinner")).toBeDefined()
  })

  it.skip("Device List loaded", async () => {
    const { container } = render(
      <MockedProvider mocks={deviceListResponse} addTypename={false}>
        <DeviceList />
      </MockedProvider>,
    )

    await wait(0)

    // screen.debug(container)
    expect(queryByTestId(container, "loadingSpinner")).toBeFalsy()
    // expect(queryByTestId(container, "portalTable")).toBeInTheDocument()
    expect(screen.queryByTestId("portalTable")).toBeInTheDocument()
  })
})
