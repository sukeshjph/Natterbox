import Icon from "@mdi/react"
import { mdiCircleMedium } from "@mdi/js"
import React from "react"
import { UserColProps as UserColumns } from "../../../../../Users/UserColProps"

export const UserColProps: IColType<IUser>[] = [
  ...UserColumns.filter(
    ({ key }) =>
      ![
        "enabled",
        "userName",
        "permissionLevel",
        "previousLogin",
        "primaryMobileNumber",
      ].includes(key),
  ),
  {
    key: "primaryGroupId",
    label: "Primary",
    show: true,
  },
  {
    key: "primaryMobileNumber",
    label: "Primary Mobile",
    show: true,
  },
  {
    key: "loggedIn",
    label: "Logged In (for Calls)",
    show: true,
  },
  {
    key: "enabled",
    label: "Status",
    show: true,
    render: (row, data) => (
      <p>
        <Icon
          path={mdiCircleMedium}
          size={0.8}
          horizontal
          vertical
          color={data.enabled ? "green" : "red"}
        />
        {data.enabled ? "Active" : "In Active"}
      </p>
    ),
  },
]
