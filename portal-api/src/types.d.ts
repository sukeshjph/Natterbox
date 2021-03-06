export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Time: any;
  FileStream: any;
  Null: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  JSON: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
};

export type CallLog = {
  __typename?: 'CallLog';
  timeStart?: Maybe<Scalars['Date']>;
  fromUserId?: Maybe<Scalars['Int']>;
  fromNumber?: Maybe<Scalars['String']>;
  toNumberDialled?: Maybe<Scalars['String']>;
  connectedTo?: Maybe<Scalars['String']>;
  connectedToNumber?: Maybe<Scalars['String']>;
  timeRinging?: Maybe<Scalars['Time']>;
  timeTalking?: Maybe<Scalars['Time']>;
  direction?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  policy?: Maybe<Scalars['String']>;
  recording?: Maybe<Scalars['FileStream']>;
};

export type CallLogSearchInput = {
  uuid?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  fromUserId?: Maybe<Scalars['Int']>;
  fromNumber?: Maybe<Scalars['String']>;
  toNumberDialled?: Maybe<Scalars['String']>;
  connectedTo?: Maybe<Scalars['String']>;
  connectedToNumber?: Maybe<Scalars['String']>;
};

export type CcMailboxes = {
  __typename?: 'ccMailboxes';
  users?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type CoreApiUser = {
  __typename?: 'CoreApiUser';
  ID?: Maybe<Scalars['String']>;
  HomeOrgID?: Maybe<Scalars['String']>;
  UserName?: Maybe<Scalars['String']>;
  FirstName?: Maybe<Scalars['String']>;
  MiddleNames?: Maybe<Scalars['String']>;
  LastName?: Maybe<Scalars['String']>;
  PrimaryMobile?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
  PermissionLevel?: Maybe<Scalars['String']>;
  Created?: Maybe<Scalars['String']>;
  Virgin?: Maybe<Scalars['String']>;
  ArchivingScope?: Maybe<Scalars['String']>;
  TwoFactorAuth?: Maybe<Scalars['String']>;
  PreviousLoginDetails?: Maybe<Scalars['String']>;
  PlaybackPerms?: Maybe<Scalars['String']>;
  AvailabilityProfileID?: Maybe<Scalars['String']>;
  AvailabilityStateID?: Maybe<Scalars['String']>;
};

export type CreateDevice = {
  sipExtension?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
};

export type CreateGroup = {
  name: Scalars['String'];
  category: Scalars['String'];
  sipExtension?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  pin?: Maybe<Scalars['String']>;
  members?: Maybe<MembersInput>;
};

export type CreateUser = {
  userName: Scalars['String'];
  firstName: Scalars['String'];
  middleNames: Scalars['String'];
  lastName: Scalars['String'];
  primaryMobileNumber: Scalars['String'];
  permissionLevel: Scalars['String'];
  enabled: Scalars['Boolean'];
  sipExtension?: Maybe<Scalars['String']>;
  pin?: Maybe<Scalars['String']>;
  primaryGroupId?: Maybe<Scalars['Int']>;
  availabilityProfileId?: Maybe<Scalars['Int']>;
  availabilityStateId?: Maybe<Scalars['Int']>;
  memberOf?: Maybe<Array<Maybe<Scalars['String']>>>;
  sipDevices?: Maybe<Array<Maybe<Scalars['String']>>>;
  pciEnabled?: Maybe<Scalars['Boolean']>;
};



export type Device = {
  __typename?: 'Device';
  id?: Maybe<Scalars['ID']>;
  sipExtension?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  macAddress?: Maybe<Scalars['String']>;
  registered?: Maybe<Scalars['Boolean']>;
  registrationExpiry?: Maybe<Scalars['Date']>;
  password?: Maybe<Scalars['Null']>;
};

export enum DirectNotifications {
  Yes = 'YES',
  No = 'NO'
}



export enum Flags {
  Transferred = 'TRANSFERRED',
  AttendedTransferred = 'ATTENDED_TRANSFERRED',
  BlindTransferred = 'BLIND_TRANSFERRED',
  CallerIdWithheld = 'CALLER_ID_WITHHELD',
  Alert = 'ALERT',
  PickedUp = 'PICKED_UP',
  PickedOff = 'PICKED_OFF',
  ConnectedToCallQueue = 'CONNECTED_TO_CALL_QUEUE',
  EavesdropAttached = 'EAVESDROP_ATTACHED',
  Eavesdropped = 'EAVESDROPPED',
  Recorded = 'RECORDED',
  LateDiverted = 'LATE_DIVERTED',
  EarlyDiverted = 'EARLY_DIVERTED',
  VoicemailRecordEnabled = 'VOICEMAIL_RECORD_ENABLED',
  Diverted = 'DIVERTED',
  ListenInEnabled = 'LISTEN_IN_ENABLED',
  ActiveRecordSucceeded = 'ACTIVE_RECORD_SUCCEEDED',
  ActiveRecordFailed = 'ACTIVE_RECORD_FAILED',
  ActiveRecordStreamSucceeded = 'ACTIVE_RECORD_STREAM_SUCCEEDED',
  ActiveRecordStreamFailed = 'ACTIVE_RECORD_STREAM_FAILED',
  DiagnosticsEnabled = 'DIAGNOSTICS_ENABLED',
  VirtualChannel = 'VIRTUAL_CHANNEL',
  CallQueueAgent = 'CALL_QUEUE_AGENT',
  CallQueueInPath = 'CALL_QUEUE_IN_PATH',
  AnalyticsEnabled = 'ANALYTICS_ENABLED'
}

export type GeneralSettings = {
  __typename?: 'GeneralSettings';
  orgId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  maxUsers?: Maybe<Scalars['String']>;
  maxDevices?: Maybe<Scalars['String']>;
  maxConnectors?: Maybe<Scalars['String']>;
  maxSIPTrunkLicenses?: Maybe<Scalars['String']>;
  directNotifications?: Maybe<DirectNotifications>;
  logCompliance?: Maybe<LogCompliance>;
  twoFactorAuth?: Maybe<TwoFactorAuth>;
};

export type Group = {
  __typename?: 'Group';
  id?: Maybe<Scalars['ID']>;
  sipExtension?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  system?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  members?: Maybe<Members>;
};

export type GroupLoggedIn = {
  __typename?: 'GroupLoggedIn';
  ID?: Maybe<Scalars['Boolean']>;
};

export type HoldMusic = {
  __typename?: 'HoldMusic';
  type?: Maybe<Scalars['String']>;
  preset?: Maybe<Scalars['String']>;
};

export type InputCcMailboxes = {
  users?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type InputDeleteLocaleSettings = {
  settingsCategory: Scalars['String'];
  settings: Array<Maybe<Scalars['String']>>;
};

export type InputUpdateGeneralSettings = {
  orgId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  maxUsers?: Maybe<Scalars['String']>;
  maxDevices?: Maybe<Scalars['String']>;
  maxConnectors?: Maybe<Scalars['String']>;
  maxSIPTrunkLicenses?: Maybe<Scalars['String']>;
  directNotifications?: Maybe<DirectNotifications>;
  logCompliance?: Maybe<LogCompliance>;
  twoFactorAuth?: Maybe<TwoFactorAuth>;
};

export type InputUpdateLocaleSettings = {
  externalCallerIdNumber?: Maybe<Scalars['String']>;
  presentCallerId?: Maybe<Scalars['Boolean']>;
  timezone?: Maybe<Scalars['String']>;
  voice?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
};

export type InputVoicemail = {
  emailNotification?: Maybe<Scalars['Boolean']>;
  emailTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  emailAttachFile?: Maybe<Scalars['Boolean']>;
  emailKeepFile?: Maybe<Scalars['Boolean']>;
  ccMailboxes?: Maybe<InputCcMailboxes>;
};


export type LocaleSettings = {
  __typename?: 'LocaleSettings';
  externalCallerIdNumber?: Maybe<Scalars['String']>;
  presentCallerId?: Maybe<Scalars['Boolean']>;
  timezone?: Maybe<Scalars['String']>;
  voice?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  holdMusic?: Maybe<HoldMusic>;
  message?: Maybe<Scalars['String']>;
};

export enum LogCompliance {
  Yes = 'YES',
  No = 'NO'
}

export type Logins = {
  __typename?: 'Logins';
  login?: Maybe<Scalars['JSON']>;
};

export type Members = {
  __typename?: 'Members';
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type MembersInput = {
  users?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  createDevice?: Maybe<Device>;
  updateDevice?: Maybe<Device>;
  deleteDevice?: Maybe<Device>;
  updateNumber?: Maybe<Number>;
  deleteNumber?: Maybe<Scalars['String']>;
  updateGeneralSettings?: Maybe<GeneralSettings>;
  updateLocaleSettings?: Maybe<LocaleSettings>;
  deleteLocaleSettings?: Maybe<LocaleSettings>;
  updateGroup?: Maybe<Group>;
  createGroup?: Maybe<Group>;
  updateGroupUsers?: Maybe<Group>;
  putPolicy?: Maybe<Policy>;
  createPolicy?: Maybe<Policy>;
  updateVoicemail?: Maybe<Voicemail>;
};


export type MutationCreateUserArgs = {
  user?: Maybe<CreateUser>;
};


export type MutationUpdateUserArgs = {
  id?: Maybe<Scalars['String']>;
  user?: Maybe<UpdateUser>;
};


export type MutationDeleteUserArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationCreateDeviceArgs = {
  device?: Maybe<CreateDevice>;
};


export type MutationUpdateDeviceArgs = {
  id?: Maybe<Scalars['ID']>;
  device?: Maybe<UpdateDevice>;
};


export type MutationDeleteDeviceArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type MutationDeleteNumberArgs = {
  number?: Maybe<DeleteNumber>;
};


export type MutationUpdateNumberArgs = {
  id?: Maybe<Scalars['String']>;
  number?: Maybe<UpdateNumber>;
};


export type MutationUpdateGeneralSettingsArgs = {
  id?: Maybe<Scalars['ID']>;
  settings?: Maybe<InputUpdateGeneralSettings>;
};


export type MutationUpdateLocaleSettingsArgs = {
  settings?: Maybe<InputUpdateLocaleSettings>;
};


export type MutationDeleteLocaleSettingsArgs = {
  deleteInput?: Maybe<InputDeleteLocaleSettings>;
};


export type MutationUpdateGroupArgs = {
  id?: Maybe<Scalars['ID']>;
  group?: Maybe<UpdateGroup>;
};


export type MutationCreateGroupArgs = {
  group?: Maybe<CreateGroup>;
};


export type MutationUpdateGroupUsersArgs = {
  id?: Maybe<Scalars['ID']>;
  users?: Maybe<Scalars['JSON']>;
};


export type MutationPutPolicyArgs = {
  id?: Maybe<Scalars['ID']>;
  policy?: Maybe<PolicyInput>;
};


export type MutationCreatePolicyArgs = {
  policy?: Maybe<PolicyInput>;
};


export type MutationUpdateVoicemailArgs = {
  id?: Maybe<Scalars['ID']>;
  voicemail?: Maybe<InputVoicemail>;
};


export type Number = {
  __typename?: 'Number';
  number?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  areaCode?: Maybe<Scalars['String']>;
  areaName?: Maybe<Scalars['String']>;
  localNumber?: Maybe<Scalars['String']>;
  geographic?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['ID']>;
  policyId?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
};

export type DeleteNumberPayload = {
  __typename?: 'DeleteNumberPayload';
  code: Maybe<Scalars['String']>;
  message: Maybe<Scalars['String']>;
  requestId: Maybe<Scalars['String']>;
}

export type Paginated = {
  __typename?: 'Paginated';
  hasMore: Scalars['Boolean'];
  firstIndex?: Maybe<Scalars['Int']>;
  lastIndex?: Maybe<Scalars['Int']>;
  prevIndex?: Maybe<Scalars['Int']>;
  nextIndex?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  callLogs: Array<Maybe<CallLog>>;
  users: Array<Maybe<User>>;
  devices: Array<Maybe<Device>>;
  numbers: Array<Maybe<Number>>;
  usersExtended?: Maybe<Array<Maybe<User>>>;
  groups: Array<Maybe<Group>>;
  members?: Maybe<Array<Maybe<User>>>;
  sound?: Maybe<Array<Maybe<Sound>>>;
  policies: Array<Maybe<Policy>>;
};


export type Policy = {
  __typename?: 'Policy';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<PolicyType>;
  enabled?: Maybe<Scalars['Boolean']>;
  created?: Maybe<Scalars['DateTime']>;
  modified?: Maybe<Scalars['DateTime']>;
  items?: Maybe<Array<Maybe<PolicyItems>>>;
};

export type PolicyInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<PolicyType>;
  enabled?: Maybe<Scalars['Boolean']>;
  created?: Maybe<Scalars['DateTime']>;
  modified?: Maybe<Scalars['DateTime']>;
  items?: Maybe<Array<Maybe<PolicyItemsInput>>>;
};

export type PolicyItems = {
  __typename?: 'PolicyItems';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  templateId?: Maybe<Scalars['ID']>;
  variables?: Maybe<Scalars['JSON']>;
  subItems?: Maybe<Scalars['JSON']>;
};

export type PolicyItemsInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  templateId?: Maybe<Scalars['ID']>;
  variables?: Maybe<Scalars['JSON']>;
  subItems?: Maybe<Scalars['JSON']>;
};

export type PolicySearchInput = {
  name?: Maybe<Scalars['String']>;
};

export enum PolicyType {
  Call = 'CALL',
  NonCall = 'NON_CALL',
  System = 'SYSTEM'
}



export type Query = {
  __typename?: 'Query';
  callLogsPaginated: Paginated;
  callLogs?: Maybe<Array<Maybe<CallLog>>>;
  usersPaginated: Paginated;
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  devicesPaginated: Paginated;
  devices?: Maybe<Array<Maybe<Device>>>;
  device?: Maybe<Device>;
  numbersPaginated?: Maybe<Paginated>;
  numbers: Array<Maybe<Number>>;
  generalSettings?: Maybe<GeneralSettings>;
  localeSettings?: Maybe<LocaleSettings>;
  groupsPaginated: Paginated;
  group?: Maybe<Group>;
  groups: Array<Maybe<Group>>;
  groupMembersPaginated: Paginated;
  groupLoggedIn?: Maybe<Logins>;
  soundPaginated?: Maybe<Paginated>;
  sound?: Maybe<Array<Maybe<Sound>>>;
  health?: Maybe<Scalars['Boolean']>;
  policiesPaginated: Paginated;
  policies: Array<Maybe<Policy>>;
  policy?: Maybe<Policy>;
  template?: Maybe<Template>;
  templates: Array<Maybe<Template>>;
  voicemail?: Maybe<Voicemail>;
};


export type QueryCallLogsPaginatedArgs = {
  index?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
  searchInput?: Maybe<CallLogSearchInput>;
};


export type QueryCallLogsArgs = {
  searchInput?: Maybe<CallLogSearchInput>;
};


export type QueryUsersPaginatedArgs = {
  index?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryDevicesPaginatedArgs = {
  index?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
};


export type QueryDeviceArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryNumbersPaginatedArgs = {
  index?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
};


export type QueryGroupsPaginatedArgs = {
  index?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
};


export type QueryGroupArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryGroupMembersPaginatedArgs = {
  id?: Maybe<Scalars['ID']>;
  index?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
};


export type QueryGroupLoggedInArgs = {
  id: Scalars['ID'];
};


export type QuerySoundPaginatedArgs = {
  index?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
};


export type QueryPoliciesPaginatedArgs = {
  index?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
  searchInput?: Maybe<PolicySearchInput>;
  type?: Maybe<Scalars['String']>;
};


export type QueryPolicyArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryTemplateArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryVoicemailArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type Sound = {
  __typename?: 'Sound';
  id?: Maybe<Scalars['Int']>;
  tag?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  created?: Maybe<Scalars['String']>;
  modified?: Maybe<Scalars['String']>;
};

export type Template = {
  __typename?: 'Template';
  id?: Maybe<Scalars['ID']>;
  parent?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  variables?: Maybe<TemplateVariables>;
};

export type TemplateVariables = {
  __typename?: 'TemplateVariables';
  type?: Maybe<Scalars['String']>;
  additionalProperties?: Maybe<Scalars['Boolean']>;
  properties?: Maybe<Scalars['JSON']>;
};


export enum TwoFactorAuth {
  Optional = 'OPTIONAL',
  Mandatory = 'MANDATORY'
}

export type UpdateDevice = {
  sipExtension?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Null']>;
};

export type UpdateGroup = {
  name?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  sipExtension?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  pin?: Maybe<Scalars['String']>;
  members?: Maybe<MembersInput>;
};

export type UpdateNumber = {
  userId?: Maybe<Scalars['PositiveInt']>;
  label?: Maybe<Scalars['String']>;
};

export type DeleteNumber = {
  countryCode?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
};

export type UpdateUser = {
  userName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  middleNames?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  sipExtension?: Maybe<Scalars['String']>;
  primaryMobileNumber?: Maybe<Scalars['String']>;
  pin?: Maybe<Scalars['String']>;
  permissionLevel?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  primaryGroupId?: Maybe<Scalars['Int']>;
  availabilityProfileId?: Maybe<Scalars['Int']>;
  availabilityStateId?: Maybe<Scalars['Int']>;
  memberOf?: Maybe<Array<Maybe<Scalars['String']>>>;
  sipDevices?: Maybe<Array<Maybe<Scalars['String']>>>;
  pciEnabled?: Maybe<Scalars['Boolean']>;
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleNames?: Maybe<Scalars['String']>;
  sipExtension?: Maybe<Scalars['String']>;
  primaryMobileNumber?: Maybe<Scalars['String']>;
  permissionLevel?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  primaryGroupId?: Maybe<Scalars['String']>;
  availabilityProfileId?: Maybe<Scalars['String']>;
  availabilityStateId?: Maybe<Scalars['String']>;
  memberOf?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sipDevices?: Maybe<Array<Maybe<Scalars['String']>>>;
  pciEnabled?: Maybe<Scalars['Boolean']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  connectedTo?: Maybe<Scalars['String']>;
  connectedToNumber?: Maybe<Scalars['String']>;
  loggedIn?: Maybe<Scalars['Boolean']>;
};

export type UserInput = {
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleNames?: Maybe<Scalars['String']>;
  sipExtension?: Maybe<Scalars['String']>;
  primaryMobileNumber?: Maybe<Scalars['String']>;
  permissionLevel?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  primaryGroupId?: Maybe<Scalars['Int']>;
  availabilityProfileId?: Maybe<Scalars['String']>;
  availabilityStateId?: Maybe<Scalars['String']>;
  memberOf?: Maybe<Array<Maybe<Scalars['String']>>>;
  sipDevices?: Maybe<Array<Maybe<Scalars['String']>>>;
  pciEnabled?: Maybe<Scalars['Boolean']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  connectedTo?: Maybe<Scalars['String']>;
  connectedToNumber?: Maybe<Scalars['String']>;
};

export type Voicemail = {
  __typename?: 'Voicemail';
  emailNotification?: Maybe<Scalars['Boolean']>;
  emailTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  emailAttachFile?: Maybe<Scalars['Boolean']>;
  emailKeepFile?: Maybe<Scalars['Boolean']>;
  ccMailboxes?: Maybe<CcMailboxes>;
};

