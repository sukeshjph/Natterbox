export type Maybe<T> = T | null;
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
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** Use JavaScript Date object for date/time fields. */
  DateTime: any;
  /**
   * A field whose value conforms to the standard internet email address format as
   * specified in RFC822: https://www.w3.org/Protocols/rfc822/.
   */
  EmailAddress: any;
  /**
   * A field whose value conforms to the standard E.164 format as specified in:
   * https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234.
   */
  PhoneNumber: any;
  /**
   * A field whose value conforms to the standard postal code formats for United
   * States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands,
   * Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg.
   */
  PostalCode: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
};

export type CallLog = {
   __typename?: 'CallLog';
  timeStart?: Maybe<Scalars['Date']>;
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

export type CreateDevice = {
  sipExtension?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
};

export type CreateUser = {
  userName: Scalars['String'];
  firstName: Scalars['String'];
  middleNames: Scalars['String'];
  lastName: Scalars['String'];
  sipExtension?: Maybe<Scalars['String']>;
  primaryMobileNumber: Scalars['String'];
  pin?: Maybe<Scalars['String']>;
  permissionLevel: Scalars['String'];
  enabled: Scalars['Boolean'];
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
  externalCallerIdNumber?: Maybe<Scalars['String']>;
  presentCallerId?: Maybe<Scalars['Boolean']>;
  timezone?: Maybe<Scalars['String']>;
  voice?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  holdMusic?: Maybe<HoldMusic>;
  message?: Maybe<Scalars['String']>;
};

export type Group = {
   __typename?: 'Group';
  id?: Maybe<Scalars['ID']>;
  sipExtension?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  system?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
};

export type HoldMusic = {
   __typename?: 'HoldMusic';
  type?: Maybe<Scalars['String']>;
  preset?: Maybe<Scalars['String']>;
};

export type InputDeleteGSettings = {
  settingsCategory: Scalars['String'];
  settings: Array<Maybe<Scalars['String']>>;
};

export type InputUpdateGSettings = {
  externalCallerIdNumber?: Maybe<Scalars['String']>;
  presentCallerId?: Maybe<Scalars['Boolean']>;
  timezone?: Maybe<Scalars['String']>;
  voice?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  createDevice?: Maybe<Device>;
  updateDevice?: Maybe<Device>;
  deleteDevice?: Maybe<Device>;
  updateNumber?: Maybe<Number>;
  updateGeneralSettings?: Maybe<GeneralSettings>;
  deleteGeneralSettings?: Maybe<GeneralSettings>;
};


export type MutationCreateUserArgs = {
  user?: Maybe<CreateUser>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  user?: Maybe<UpdateUser>;
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


export type MutationUpdateNumberArgs = {
  id?: Maybe<Scalars['String']>;
  number?: Maybe<UpdateNumber>;
};


export type MutationUpdateGeneralSettingsArgs = {
  settings?: Maybe<InputUpdateGSettings>;
};


export type MutationDeleteGeneralSettingsArgs = {
  deleteInput?: Maybe<InputDeleteGSettings>;
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

export type Paginated = {
   __typename?: 'Paginated';
  hasMore: Scalars['Boolean'];
  firstIndex?: Maybe<Scalars['Int']>;
  lastIndex?: Maybe<Scalars['Int']>;
  prevIndex?: Maybe<Scalars['Int']>;
  nextIndex?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  numbers: Array<Maybe<Number>>;
  groups: Array<Maybe<Group>>;
};




export type Query = {
   __typename?: 'Query';
  callLogs?: Maybe<Array<Maybe<CallLog>>>;
  callLogsWithSearch?: Maybe<Array<Maybe<CallLog>>>;
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  devices?: Maybe<Array<Maybe<Device>>>;
  device?: Maybe<Device>;
  numbersPaginated: Paginated;
  numbers: Array<Maybe<Number>>;
  generalSettings?: Maybe<GeneralSettings>;
  groupsPaginated: Paginated;
};


export type QueryCallLogsWithSearchArgs = {
  searchInput: CallLogSearchInput;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
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


export type UpdateDevice = {
  sipExtension?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Null']>;
};

export type UpdateNumber = {
  userId?: Maybe<Scalars['PositiveInt']>;
  label?: Maybe<Scalars['String']>;
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
  memberOf?: Maybe<Array<Maybe<Scalars['String']>>>;
  sipDevices?: Maybe<Array<Maybe<Scalars['String']>>>;
  pciEnabled?: Maybe<Scalars['Boolean']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  connectedTo?: Maybe<Scalars['String']>;
  connectedToNumber?: Maybe<Scalars['String']>;
};
