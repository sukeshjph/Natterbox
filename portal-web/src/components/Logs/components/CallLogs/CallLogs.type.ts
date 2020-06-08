export interface ICallLog {
  timeStart: string
  fromNumber: string
  toNumberDialled: string
  connectedTo: string
  connectedToNumber: string
  timeRinging: string
  timeTalking: string
  direction: "INBOUND" | "OUTBOUND"
  type: string
  flags: string
  policy: string
  recording: any | null
}

export interface ISearchParams {
  startTime: string
  endTime: string
  fromUserId: number
  fromNumber: string
  toNumberDialled: string
  connectedTo: string
  connectedToNumber: string
  uuid: string
}
