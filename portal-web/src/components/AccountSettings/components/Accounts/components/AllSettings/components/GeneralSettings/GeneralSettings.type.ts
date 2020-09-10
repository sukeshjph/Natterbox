export interface GeneralSettingsStateType {
  errorSnack: boolean
  generalSettings: IGeneralSettings
  updateGeneralSettings: any
}

export enum TwoFactorAuth {
  OPTIONAL = "OPTIONAL",
  MANDATORY = "MANDATORY",
}

export enum DirectNotifications {
  NO = "NO",
  YES = "YES",
}

export enum LogCompliance {
  NO = "NO",
  YES = "YES",
}

export interface IGeneralSettings {
  orgId: String | undefined
  name: String | undefined
  alias: String | undefined
  maxUsers: String | undefined
  maxDevices: String | undefined
  maxConnectors: String | undefined
  maxSIPTrunkLicenses: String | undefined
  directNotifications: DirectNotifications | undefined
  logCompliance: LogCompliance | undefined
  twoFactorAuth: TwoFactorAuth | undefined
}

export interface FlexibleEvent {
  target: {
    value: String
    type: String
  }
}
