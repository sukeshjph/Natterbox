import React from "react"
import {
  CallLogs,
  EventLogs,
  MyCalls,
  SMSMMSLogs,
  BulkDownloads,
} from "../../components/Logs"
import { TabbedTable } from "../../components/shared"

const LogTabs: Record<string, any> = {
  "Call Logs": <CallLogs />,
  "Event Logs": <EventLogs />,
  "SMS/MMS Logs": <SMSMMSLogs />,
  "My Calls": <MyCalls />,
  "Bulk Downloads": <BulkDownloads />,
}

const LogsPage = React.memo(() => <TabbedTable TabsMenu={LogTabs} />)

export default LogsPage
