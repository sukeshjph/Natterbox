import React from "react"
import { render, getByTestId } from "@testing-library/react"
import { MockedProvider } from "@apollo/react-testing"
// import wait from "waait"
import "@testing-library/jest-dom/extend-expect"
import { DeviceCreate } from "./DeviceCreate"

it("Device Create", async () => {
  const { container, unmount } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <DeviceCreate
        closeDialog={() => undefined}
        refreshData={() => undefined}
      />
    </MockedProvider>,
    {
      container: document.body,
    },
  )

  expect(getByTestId(container, "DeviceCreateGS")).toBeDefined()

  // screen.debug(container)

  unmount()
})

// test("sync test", () => {
//   render(<Login />, ({ getByLabelText }) => {
//     getByLabelText("username")
//     getByLabelText("username").value = "chucknorris"
//   })
// })

// test("async test", () => {
//   render(<Login />, async ({ getByLabelText }) => {
//     await wait(() => getByLabelText("username"))
//     getByLabelText("username").value = "chucknorris"
//   })
// })
