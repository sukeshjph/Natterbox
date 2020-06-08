import { gql } from "apollo-boost"

export const GET_ACCOUNT_SETTINGS = gql`
  {
    generalSettings {
      externalCallerIdNumber
      presentCallerId
      timezone
      voice
      countryCode
      message
    }
    numbers {
      number
      policyId
    }
  }
`

export const DELETE_GENERAL_SETTINGS = gql`
  mutation DeleteGeneralSettings($deleteInput: inputDeleteGSettings) {
    deleteGeneralSettings(deleteInput: $deleteInput) {
      externalCallerIdNumber
      presentCallerId
      timezone
      voice
      countryCode
      message
    }
  }
`

export const UPDATE_GENERAL_SETTINGS = gql`
  mutation UpdateGeneralSettings($settings: inputUpdateGSettings) {
    updateGeneralSettings(settings: $settings) {
      externalCallerIdNumber
      presentCallerId
      timezone
      voice
      countryCode
      message
    }
  }
`
