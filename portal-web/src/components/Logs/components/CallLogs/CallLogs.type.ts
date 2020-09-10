export enum Directions {
  OUTBOUND = "OUTBOUND",
  INTERNAL = "INTERNAL",
  INBOUND = "INBOUND",
  EXTERNAL = "EXTERNAL",
  SERVICE = "SERVICE",
}

export enum ConType {
  CONNECTED = "Connected",
  NOTCONNECTED = "Not connected",
}

export enum Flags {
  YES = "YES",
  NO = "NO",
}

export interface ICallLog {
  timeStart: string
  fromNumber: string
  toNumberDialled: string
  connectedTo: string
  connectedToNumber: string
  timeRinging: string
  timeTalking: string
  direction: Directions
  type: ConType
  flags: Flags
  policy: string
  recording: any | null
}

export interface ICalllogsWithPagers extends IPager {
  callLogs: ICallLog[]
}

export interface ISearchParams {
  startTime: string
  endTime: string
  fromUserId: string
  fromNumber: string
  toNumberDialled: string
  connectedTo: string
  connectedToNumber: string
  uuid: string
}

export enum searchKeys {
  TimeStart = "timeStart",
  FromNumber = "fromNumber",
  FromUserId = "fromUserId",
  ToNumberDialled = "toNumberDialled",
  ConnectedTo = "connectedTo",
  ConnectedToNumber = "connectedToNumber",
  Uuid = "uuid",
}

type colType = React.ReactNode | string

export type tableRow = {
  rowKey: string
  columns: colType[]
}

export interface SearchStateType {
  startTime: null | Date
  endTime: null | Date
  usersLoading: boolean | null
  searchRows: tableRow[]
  searchState: Partial<Record<searchKeys, string>>
  showError: boolean
  error: string
}
