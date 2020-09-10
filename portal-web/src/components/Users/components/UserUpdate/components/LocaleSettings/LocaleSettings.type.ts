export interface ILocaleSettingsStateType {
  settings: ILocaleSettingsType
  userId: undefined
  numbers: string[]
  countries: Country[]
  timezones: TimeZone[]
  voices: Voice[]
  countriesCache: Country
  timezonesCache: TimeZone
  voicesCache: Voice
}

type Voice = {
  "Portal Name": string
  "Sapien Name": string
}

type TimeZone = {
  Label: string
  Val: string
}

type Country = {
  Country: string
  Code: string
}

export interface ILocaleSettingsType {
  internalCallerIdNumber: string
  externalCallerIdNumber: string
  internalCallerIdName: string
  presentCallerId: boolean
  voice: string
  countryCode: string
  timezone: string
}
