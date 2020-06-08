import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import { Header } from "./Header"

describe("Header", () => {
  it("Renders Header", () => {
    const headerProps = {
      location: {
        pathname: "/logs",
      },
    }
    const wrapper = shallow(<Header {...headerProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
