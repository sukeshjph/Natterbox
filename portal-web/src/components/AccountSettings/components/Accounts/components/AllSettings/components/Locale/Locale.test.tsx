import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
import toJson from "enzyme-to-json"
// import wait from "waait"
import { GetAccountSettingsResponse } from "../../../../../../../../mocks"
import { Locale } from "./Locale"

const initialProps = {
  gSettings: GetAccountSettingsResponse.data.locale,
  numbers: GetAccountSettingsResponse.data.numbers,
  refetchSettings: () => undefined,
}

const wrapper = mount(
  <MockedProvider mocks={[]} addTypename={false}>
    <Locale {...initialProps} />
  </MockedProvider>,
)

describe("GeneralSettings(Accounts)", () => {
  const localeWrapper = wrapper.childAt(0).childAt(0)

  it.skip("Renders General Settings", () => {
    expect(toJson(localeWrapper)).toMatchSnapshot()
  })

  describe("Present Caller id", () => {
    it("Present Caller id checked", () => {
      expect(
        wrapper
          .find('[data-testid="presentCallerIdCheckBox"]')
          .first()
          .props().checked,
      ).toBeTruthy()
      expect(
        wrapper
          .find('[data-testid="externalCallerIdNumber"]')
          .first()
          .props().disabled,
      ).toBeFalsy()
    })

    it("Present Caller id unchecked", () => {
      wrapper
        .find('[data-testid="presentCallerIdCheckBox"]')
        .first()
        .prop("onChange")({ target: { type: "checkbox", checked: false } })

      wrapper.update()

      expect(
        wrapper
          .find('[data-testid="presentCallerIdCheckBox"]')
          .first()
          .props().checked,
      ).toBeFalsy()
    })
  })
})
