/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { parseISO, format } from "date-fns"
import Icon from "@mdi/react"
import {
  mdiPhoneOutgoing,
  mdiPhoneIncoming,
  mdiRefresh,
  mdiFileRefreshOutline,
  mdiFaceAgent,
} from "@mdi/js"
import { ICallLog, Directions } from "./CallLogs.type"
import styles from "./CallLog.module.scss"
import { getCamelCaseString } from "../../../../util"
import { filterDataTypes } from "../../../../common.types"
import { CallLogRecordingPopup } from "./components/CallLogRecording/CallLogRecordingPopup"

const getHHmmSS = (colVal: number) =>
  new Date(1000 * colVal).toISOString().substr(11, 8)

export const callTypesHTML = {
  [Directions.INBOUND]: (
    <Icon path={mdiPhoneIncoming} size={0.8} horizontal vertical />
  ),
  [Directions.OUTBOUND]: (
    <Icon path={mdiPhoneOutgoing} size={0.8} horizontal vertical rotate={180} />
  ),
  [Directions.INTERNAL]: (
    <Icon path={mdiRefresh} size={0.8} horizontal vertical rotate={180} />
  ),
  [Directions.EXTERNAL]: (
    <Icon
      path={mdiFileRefreshOutline}
      size={0.8}
      horizontal
      vertical
      rotate={180}
    />
  ),
  [Directions.SERVICE]: (
    <Icon path={mdiFaceAgent} size={0.8} horizontal vertical rotate={180} />
  ),
}

export const CallLogProps: IColType<ICallLog>[] = [
  {
    key: "timeStart",
    label: "Date/Time",
    colType: filterDataTypes.DateTime,
    show: true,
    filterable: true,
    render: colData => format(parseISO(colData), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    key: "fromNumber",
    label: "From/Number",
    colType: filterDataTypes.String,
    show: true,
    filterable: true,
  },
  {
    key: "toNumberDialled",
    colType: filterDataTypes.String,
    label: "Dialled/Number",
    show: true,
    filterable: true,
  },
  {
    key: "connectedTo",
    colType: filterDataTypes.String,
    label: "Connected To(User)",
    show: true,
    filterable: true,
  },
  {
    key: "connectedToNumber",
    colType: filterDataTypes.String,
    label: "Connected To(number)",
    show: true,
    filterable: true,
  },
  {
    key: "timeRinging",
    colType: filterDataTypes.String,
    label: "Time Ringing",
    show: true,
    filterable: false,
    render: colData => {
      if (colData) {
        return getHHmmSS(colData)
      }
      return ""
    },
  },
  {
    key: "timeTalking",
    colType: filterDataTypes.String,
    label: "Time Talking",
    show: true,
    filterable: false,
    render: colData => {
      if (colData) {
        return getHHmmSS(colData)
      }
      return ""
    },
  },
  {
    key: "direction",
    colType: filterDataTypes.Choice,
    label: "Direction",
    show: true,
    filterable: true,
    render: colData => (
      <div className={styles.callTypesContainer}>
        {callTypesHTML[(colData || "").toUpperCase()]}
        {getCamelCaseString(colData)}
      </div>
    ),
  },
  {
    key: "type",
    colType: filterDataTypes.Choice,
    label: "Type",
    filterable: true,
    show: true,
  },
  {
    key: "flags",
    colType: filterDataTypes.Choice,
    label: "Flags",
    show: true,
    filterable: true,
    render: colData => <div>{getCamelCaseString(colData)}</div>,
  },
  {
    key: "policy",
    colType: filterDataTypes.String,
    label: "Policy",
    show: true,
    filterable: true,
  },
  {
    key: "recording",
    colType: filterDataTypes.String,
    label: "Recording",
    show: true,
    render: recordings => <CallLogRecordingPopup recordings={recordings} />,
  },
]
