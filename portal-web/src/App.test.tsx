/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import App from "./App"

import { useAuth0 } from "./plugins/auth0"

jest.mock("./plugins/auth0")

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

describe("Main App", () => {
  const setup = (mockOverrides = {}) => ({
    isInitializing: false,
    isAuthenticated: true,
    loginWithRedirect: () => undefined,
    userToken: "anyToken",
    ...mockOverrides,
  })

  it("Renders App", () => {
    useAuth0.mockReturnValueOnce(setup())
    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  describe("App states", () => {
    it("initializing", () => {
      useAuth0.mockReturnValueOnce(setup({ isInitializing: true }))
      const wrapper = shallow(<App />)
      expect(wrapper.find(".spinPanel")).toBeDefined()
    })

    it("is not authenticated", () => {
      const redirectMock = jest.fn()
      useAuth0.mockReturnValueOnce(
        setup({ isAuthenticated: false, loginWithRedirect: redirectMock }),
      )
      shallow(<App />)
      expect(redirectMock).toHaveBeenCalled()
    })
  })
})
