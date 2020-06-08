export interface IDevice {
  id: string
  sipExtension: null | string
  description: null | string
  location: null | string
  enabled: boolean
  password?: null
  macAddress: string
  registered: boolean
  registrationExpiry: Date
}
