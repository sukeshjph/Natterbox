import gql from "graphql-tag"

export const GET_ACCOUNT_SETTINGS = gql`
  {
    generalSettings {
      orgId
      name
      alias
      maxUsers
      maxDevices
      maxConnectors
      maxSIPTrunkLicenses
      directNotifications
      logCompliance
      twoFactorAuth
    }
    localeSettings {
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

export const DELETE_LOCALE_SETTINGS = gql`
  mutation DeleteLocaleSettings($deleteInput: inputDeleteLocaleSettings) {
    deleteLocaleSettings(deleteInput: $deleteInput) {
      externalCallerIdNumber
      presentCallerId
      timezone
      voice
      countryCode
      message
    }
  }
`

export const UPDATE_LOCALE_SETTINGS = gql`
  mutation UpdateLocaleSettings($settings: inputUpdateLocaleSettings) {
    updateLocaleSettings(settings: $settings) {
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
  mutation UpdateGeneralSettings($settings: inputUpdateGeneralSettings) {
    updateGeneralSettings(settings: $settings) {
      orgId
      name
      alias
      maxUsers
      maxDevices
      maxConnectors
      maxSIPTrunkLicenses
      directNotifications
      logCompliance
      twoFactorAuth
    }
  }
`
