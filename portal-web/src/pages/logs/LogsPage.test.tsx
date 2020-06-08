import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import Logs from "./LogsPage"

describe("Logs", () => {
  const LogProps = {
    children: <div>Any react children</div>,
  }
  const wrapper = shallow(<Logs {...LogProps} />)

  it("Renders Logs", () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it.skip("should select Call Logs tab by default", () => {
    expect(wrapper.find(".tabsMenu").prop("value")).toBe(0)
  })

  describe("should render given react component for selected tab", () => {
    it("selected tab children", () => {
      const newLogProps = {
        children: <div id="child1">Updated children</div>,
      }
      wrapper.setProps({ ...newLogProps })
      expect(wrapper.find("#child1")).toBeDefined()
    })
  })
})
