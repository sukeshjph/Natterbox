enum BinaryChoice {
  YES = "YES",
  NO = "NO",
}

interface IOtherVersion {
  ThisVersion: BinaryChoice
  VersionNumber: string
  ModifyTimeEpoch: string
  ModifiedByUserID: string
}

interface IOrgUser {
  UserID: string
  CanRead: BinaryChoice
  CanDelete: BinaryChoice
}

export interface IDefaultPolicy {
  Type: string
  PolicyID: number
}

export interface OrgPolicy {
  ID: number
  Name: string
  Mode: string
  Version: number
  OrgID: number
  RetentionMin: number
  RetentionMax: number
  ReducedRedundancy: BinaryChoice
  StorageEndpointID: number
  OwnerUser: string
  AskReasonForAccess: BinaryChoice
  Description: string
  AutoApproveDataSubjectRequest: BinaryChoice
  AllowUnrestrictedAccess: BinaryChoice
  DisallowRecordingDownload: BinaryChoice
  ACLType: string
  Groups: string
  OtherVersions: IOtherVersion[]
  Users: IOrgUser[]
  DataCustodians: string
}

export interface Endpoint {
  ID: number
  Name: string
  Type: string
  Encrypted: BinaryChoice
  Compressed: BinaryChoice
  RetentionManaged: BinaryChoice
  OrgID: number
  Bucket: string
  Region: string
  AwsRegion: string
}

export interface IPolicyDefault {
  callRecordingPolicy: string
  bufferedRecordingPolicy: string
  smsPolicy: string
  cdrPolicy: string
  pcapPolicy: string
}

export interface ArchivingState {
  showError: boolean
  error: string
  defaultPolicies: IPolicyDefault
}

interface IUpdatable<T> {
  Updatable: string
  Value: T
}

type dataCustodianInput = IUpdatable<string> & {
  Notify: String
}

interface IOtherVersionInput {
  childKey: string
  Value: IOtherVersion[]
}

interface IUsersInput {
  childKey: string
  Value: IOrgUser[]
}

type retentionType = IUpdatable<number> & {
  Unit: String
}

interface policyInputObject {
  Name: IUpdatable<string>
  Mode: IUpdatable<string>
  Version: IUpdatable<number>
  OrgID: IUpdatable<number>
  RetentionMin: retentionType
  RetentionMax: retentionType
  ReducedRedundancy: IUpdatable<string>
  StorageEndpointID: IUpdatable<number>
  OwnerUser: {
    Updatable: string
    CanRead: string
    CanDelete: string
  }
  AskReasonForAccess: IUpdatable<string>
  Description: IUpdatable<string>
  AutoApproveDataSubjectRequest: IUpdatable<string>
  AllowUnrestrictedAccess: IUpdatable<string>
  DisallowRecordingDownload: IUpdatable<string>
  ACLType: IUpdatable<string>
  Groups: IUpdatable<string>
  OtherVersions: {
    Updatable: string
    Value: IOtherVersionInput
  }
  Users: {
    Updatable: string
    Value?: IUsersInput
  }
  DataCustodians: dataCustodianInput
}

export interface ICreatePolicyReducer {
  error: string
  createPolicy: policyInputObject
}
