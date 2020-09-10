export interface IUsersWithPagers extends IPager {
  users: IUser[]
}

export type userDetailsUpdateStateType = {
  user: userDetailsUpdate
  devices: IDevice[] | []
  devicesCache: IDevice[] | []
}

export type userDetailsUpdate = Pick<
  IUser,
  | "firstName"
  | "lastName"
  | "userName"
  | "middleNames"
  | "permissionLevel"
  | "enabled"
  | "sipDevices"
> & {
  primaryMobileNumber: number | null
  sipExtension: number | null
}

export type userCreateStateType = Pick<
  IUser,
  | "firstName"
  | "lastName"
  | "userName"
  | "middleNames"
  | "permissionLevel"
  | "enabled"
> & {
  primaryMobileNumber: string | null
  sipExtension?: number | null
}
