import React from "react"
import { parseISO, isAfter, differenceInSeconds } from "date-fns"
import { isEmpty } from "ramda"
import Icon from "@mdi/react"
import { mdiTimer, mdiTimerOffOutline } from "@mdi/js"
import { getHourMinutesSeconds } from "../../../util"

export const DeviceColProps: IColType<IDevice>[] = [
  {
    key: "id",
    label: "ID",
    show: true,
  },
  {
    key: "macAddress",
    label: "Address",
    show: true,
  },
  {
    key: "registrationExpiry",
    label: "Registration Expires In",
    show: true,
    render: colData => {
      if (isEmpty(colData)) return ""

      const today = new Date()
      const regDate = parseISO(colData)

      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon
            path={isAfter(today, regDate) ? mdiTimerOffOutline : mdiTimer}
            size={0.8}
            horizontal
            vertical
            rotate={180}
          />
          {isAfter(today, regDate)
            ? "Expired"
            : getHourMinutesSeconds(differenceInSeconds(regDate, today))}
        </div>
      )
    },
  },
]
