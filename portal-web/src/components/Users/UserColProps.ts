import { IUser } from "./User.type"

export const UserColProps: IColType<IUser>[] = [
  {
    key: "userId",
    label: "ID",
  },
  {
    key: "userName",
    label: "Login Name",
  },
  {
    key: "sipExtension",
    label: "Extension",
  },
  {
    key: "primaryMobileNumber",
    label: "Primary DDI",
  },
  {
    key: "firstName",
    label: "First Name",
  },
  {
    key: "lastName",
    label: "Last Name",
  },
  {
    key: "primaryMobileNumber",
    label: "Primary Mobile",
  },
  {
    key: "permissionLevel",
    label: "User Permissions",
  },
  {
    key: "enabled",
    label: "Status",
  },
  {
    key: "previousLogin",
    label: "Previous Login",
  },
]

export const UserDetailsColumns = {
  userId: "ID",
  firstName: "First Name",
  lastName: "Last Name",
  primaryMobileNumber: "Primary Mobile",
  userName: "Login Name",
  enabled: "Status",
  sipExtension: "Extension",
  primaryDDI: "Primary DDI",
  permissionLevel: "User Permissions",
}
