/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { parseISO, format } from "date-fns"
import Link from "@material-ui/core/Link"
import Icon from "@mdi/react"
import {
  mdiPhoneOutgoing,
  mdiPhoneIncoming,
  mdiRefresh,
  mdiFileRefreshOutline,
  mdiFaceAgent,
  mdiHeadphones,
} from "@mdi/js"
import { ICallLog } from "./CallLogs.type"
import styles from "./CallLog.module.scss"
import { getCamelCaseString } from "../../../../util"

enum CallTypes {
  OUTBOUND = "OUTBOUND",
  INTERNAL = "INTERNAL",
  INBOUND = "INBOUND",
  EXTERNAL = "EXTERNAL",
  SERVICE = "SERVICE",
}

const getHHmmSS = (colVal: number) =>
  new Date(1000 * colVal).toISOString().substr(11, 8)

export const callTypesHTML = {
  [CallTypes.INBOUND]: (
    <Icon path={mdiPhoneIncoming} size={0.8} horizontal vertical />
  ),
  [CallTypes.OUTBOUND]: (
    <Icon path={mdiPhoneOutgoing} size={0.8} horizontal vertical rotate={180} />
  ),
  [CallTypes.INTERNAL]: (
    <Icon path={mdiRefresh} size={0.8} horizontal vertical rotate={180} />
  ),
  [CallTypes.EXTERNAL]: (
    <Icon
      path={mdiFileRefreshOutline}
      size={0.8}
      horizontal
      vertical
      rotate={180}
    />
  ),
  [CallTypes.SERVICE]: (
    <Icon path={mdiFaceAgent} size={0.8} horizontal vertical rotate={180} />
  ),
}

export const CallLogProps: IColType<ICallLog>[] = [
  {
    key: "timeStart",
    label: "Date/Time",
    render: colData => format(parseISO(colData), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    key: "fromNumber",
    label: "From/Number",
  },
  {
    key: "toNumberDialled",
    label: "Dialled/Number",
  },
  {
    key: "connectedTo",
    label: "Connected To(User)",
  },
  {
    key: "connectedToNumber",
    label: "Connected To(number)",
  },
  {
    key: "timeRinging",
    label: "Time Ringing",
    render: colData => {
      if (colData) {
        return getHHmmSS(colData)
      }
      return ""
    },
  },
  {
    key: "timeTalking",
    label: "Time Talking",
    render: colData => {
      if (colData) {
        return getHHmmSS(colData)
      }
      return ""
    },
  },
  {
    key: "direction",
    label: "Direction",
    render: colData => (
      <div className={styles.callTypesContainer}>
        {callTypesHTML[(colData || "").toUpperCase()]}
        {getCamelCaseString(colData)}
      </div>
    ),
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "flags",
    label: "Flags",
    render: colData => <div>{getCamelCaseString(colData)}</div>,
  },
  {
    key: "policy",
    label: "Policy",
  },
  {
    key: "recording",
    label: "Recording",
    render: () => (
      <div className={styles.callTypesContainer}>
        <Icon
          path={mdiHeadphones}
          size={0.8}
          horizontal
          vertical
          rotate={180}
        />
        <Link href="#" onClick={() => undefined}>
          Listen
        </Link>
      </div>
    ),
  },
]
