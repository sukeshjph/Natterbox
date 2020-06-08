import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
// import wait from "waait"
// import { GetAccountSettingsResponse } from "../../../../../mocks"
import { GeneralSettingsCreate } from "./GeneralSettingsCreate"

const wrapper = mount(
  <MockedProvider mocks={[]} addTypename={false}>
    <GeneralSettingsCreate refreshData={() => undefined} />
  </MockedProvider>,
)

describe("Create Device", () => {
  describe("System generated", () => {
    it("System generated unChecked", () => {
      expect(
        wrapper
          .find('[data-testid="sip-address"]')
          .first()
          .props().disabled,
      ).toBeFalsy()
    })

    it.skip("System generated checked", () => {
      const chkBox = wrapper.find('[data-testid="sys-generate-chk"]').first()

      if (chkBox) {
        chkBox.prop("onChange")({
          target: { type: "checkbox", checked: true },
        })
      }

      wrapper.update()

      expect(
        wrapper
          .find('[data-testid="sip-address"]')
          .first()
          .props().disabled,
      ).toBeTruthy()
    })
  })
})
