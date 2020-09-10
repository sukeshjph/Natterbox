import { useEffect } from "react"
import { ValidatorForm } from "react-material-ui-form-validator"
import { validatePhoneForE164 } from "../../../../util"

export const usePhoneNumberValidationHook = () => {
  useEffect(() => {
    ValidatorForm.addValidationRule("isValidPhoneNumber", value => {
      if (value) {
        return validatePhoneForE164(value)
      }
      return true
    })
  }, [])

  useEffect(() => {
    return () => {
      ValidatorForm.removeValidationRule("isValidPhoneNumber")
    }
  }, [])
}
