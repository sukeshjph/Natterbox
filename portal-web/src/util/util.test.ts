import { validatePhoneForE164 } from "./util"

describe("Testing utility functions", () => {
  describe("validatePhoneForE164 ", () => {
    it("Valid Phone number", () => {
      const validPhoneNumber = "+447415677306"
      expect(validatePhoneForE164(validPhoneNumber)).toBeTruthy()
    })

    it("InValid Phone number", () => {
      const validPhoneNumber = "87415677306"
      expect(validatePhoneForE164(validPhoneNumber)).toBeFalsy()
    })
  })
})
