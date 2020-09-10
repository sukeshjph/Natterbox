export const UserColProps: IColType<IUser>[] = [
  {
    key: "userId",
    label: "ID",
    show: true,
  },
  {
    key: "userName",
    label: "Login Name",
    show: true,
  },
  {
    key: "sipExtension",
    label: "Extension",
    show: true,
  },
  {
    key: "primaryMobileNumber",
    label: "Primary DDI",
    show: true,
  },
  {
    key: "firstName",
    label: "First Name",
    show: true,
  },
  {
    key: "lastName",
    label: "Last Name",
    show: true,
  },
  {
    key: "primaryMobileNumber",
    label: "Primary Mobile",
    show: true,
  },
  {
    key: "permissionLevel",
    label: "User Permissions",
    show: true,
  },
  {
    key: "enabled",
    label: "Status",
    show: true,
  },
  {
    key: "previousLogin",
    label: "Previous Login",
    show: true,
  },
]

export const UserDetailsColumns = {
  userId: "ID",
  firstName: "First Name",
  middleName: "Middle Name",
  lastName: "Last Name",
  primaryMobileNumber: "Primary Mobile",
  userName: "Login Name",
  enabled: "Status",
  sipExtension: "Extension",
  primaryDDI: "Primary DDI",
  permissionLevel: "User Permissions",
}
