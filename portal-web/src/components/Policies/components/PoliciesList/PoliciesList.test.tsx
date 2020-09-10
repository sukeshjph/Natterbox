import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
// import waitForExpect from "wait-for-expect"
import wait from "waait"
import { BrowserRouter as Router } from "react-router-dom"
import { GET_ALL_POLICIES } from "../PoliciesQueries"
import { policiesResponse } from "../Policies.mock"
import { PoliciesList } from "./PoliciesList"

const mocks = [
  {
    request: {
      query: GET_ALL_POLICIES,
    },
    result: policiesResponse,
  },
]

describe("Policies", () => {
  let wrapper

  it("Loading PoliciesList data", () => {
    wrapper = mount(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PoliciesList />
        </MockedProvider>
      </Router>,
    )

    expect(wrapper.find('[data-testid="loadingSpinner"]')).toBeTruthy()
  })

  it("should render Policies when loading finished", async () => {
    wrapper = mount(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PoliciesList />
        </MockedProvider>
      </Router>,
    )

    await wait(0)

    expect(wrapper.find('[data-testid="PoliciesList"]')).toBeTruthy()
    expect(
      Object.keys(wrapper.find('[data-testid="loadingSpinner"]')).length,
    ).toBe(0)
  })

  it("Error state", async () => {
    const mockWithError = [
      {
        request: {
          query: GET_ALL_POLICIES,
        },
        error: new Error("Fetching Policies error"),
      },
    ]

    wrapper = mount(
      <Router>
        <MockedProvider mocks={mockWithError} addTypename={false}>
          <PoliciesList />
        </MockedProvider>
      </Router>,
    )

    await wait(0)

    expect(wrapper.find('[data-testid="PoliciesListError"]')).toBeDefined()
    expect(
      Object.keys(wrapper.find('[data-testid="loadingSpinner"]')).length,
    ).toBe(0)
  })
})
