export interface IUser {
  userId: number
  firstName: string
  lastName: string
  userName: string
  middleNames: string
  sipExtension: string
  primaryMobileNumber: string
  permissionLevel: string
  previousLogin: string
  enabled: Boolean
  primaryGroupId: string
  availabilityProfileId: string
  availabilityStateId: string
  memberOf: string[]
  sipDevices: string[]
  pciEnabled: Boolean
  scopes: string[]
}
