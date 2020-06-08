import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import { Login } from "./Login"

import { useAuth0 } from "../../../plugins/auth0"

jest.mock("../../../plugins/auth0")

describe("Login", () => {
  useAuth0.mockReturnValueOnce({
    isAuthenticated: false,
    logout: () => undefined,
  })
  const wrapper = shallow(<Login />)
  it("Renders Login", () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
