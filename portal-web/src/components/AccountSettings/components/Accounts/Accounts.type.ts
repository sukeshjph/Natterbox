type HoldMusic = {
  type: String
  preset: String
}

export interface ILocale {
  externalCallerIdNumber: string | null
  presentCallerId: boolean | null
  timezone: string | null
  voice: string | null
  countryCode: string | null
  holdMusic?: HoldMusic
}
