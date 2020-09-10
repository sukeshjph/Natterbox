export interface VoicemailStateType {
  voicemail: IVoicemailType
  updateVoicemail: any
  usersCache: IUser[]
  users: IUser[]
  userId: number | undefined
}

export interface IVoicemailType {
  emailNotification: boolean
  emailTo: any[]
  emailAttachFile: boolean
  emailKeepFile: boolean
  ccMailboxes: ccMailboxes
}

interface ccMailboxes {
  users: number[]
}
