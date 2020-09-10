import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  deleteNumber?: Maybe<DeleteNumberPayload>;
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


export type MutationUpdateNumberArgs = {
  id?: Maybe<Scalars['String']>;
  number?: Maybe<UpdateNumber>;
};

export type MutationDeleteNumberArgs = {
  number?: Maybe<DeleteNumber>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CallLogSearchInput: CallLogSearchInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Paginated: ResolverTypeWrapper<Paginated>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CallLog: ResolverTypeWrapper<CallLog>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  FileStream: ResolverTypeWrapper<Scalars['FileStream']>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Device: ResolverTypeWrapper<Device>;
  Null: ResolverTypeWrapper<Scalars['Null']>;
  Number: ResolverTypeWrapper<Number>;
  Group: ResolverTypeWrapper<Group>;
  Members: ResolverTypeWrapper<Members>;
  Sound: ResolverTypeWrapper<Sound>;
  Policy: ResolverTypeWrapper<Policy>;
  PolicyType: PolicyType;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  PolicyItems: ResolverTypeWrapper<PolicyItems>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  GeneralSettings: ResolverTypeWrapper<GeneralSettings>;
  DirectNotifications: DirectNotifications;
  LogCompliance: LogCompliance;
  TwoFactorAuth: TwoFactorAuth;
  LocaleSettings: ResolverTypeWrapper<LocaleSettings>;
  HoldMusic: ResolverTypeWrapper<HoldMusic>;
  Logins: ResolverTypeWrapper<Logins>;
  PolicySearchInput: PolicySearchInput;
  Template: ResolverTypeWrapper<Template>;
  TemplateVariables: ResolverTypeWrapper<TemplateVariables>;
  Voicemail: ResolverTypeWrapper<Voicemail>;
  ccMailboxes: ResolverTypeWrapper<CcMailboxes>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateUser: CreateUser;
  UpdateUser: UpdateUser;
  createDevice: CreateDevice;
  updateDevice: UpdateDevice;
  updateNumber: UpdateNumber;
  deleteNumber: DeleteNumber;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  inputUpdateGeneralSettings: InputUpdateGeneralSettings;
  inputUpdateLocaleSettings: InputUpdateLocaleSettings;
  inputDeleteLocaleSettings: InputDeleteLocaleSettings;
  updateGroup: UpdateGroup;
  MembersInput: MembersInput;
  createGroup: CreateGroup;
  policyInput: PolicyInput;
  PolicyItemsInput: PolicyItemsInput;
  inputVoicemail: InputVoicemail;
  inputCCMailboxes: InputCcMailboxes;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  Flags: Flags;
  UserInput: UserInput;
  GroupLoggedIn: ResolverTypeWrapper<GroupLoggedIn>;
  CoreApiUser: ResolverTypeWrapper<CoreApiUser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Int: Scalars['Int'];
  CallLogSearchInput: CallLogSearchInput;
  String: Scalars['String'];
  Paginated: Paginated;
  Boolean: Scalars['Boolean'];
  CallLog: CallLog;
  Date: Scalars['Date'];
  Time: Scalars['Time'];
  FileStream: Scalars['FileStream'];
  User: User;
  ID: Scalars['ID'];
  Device: Device;
  Null: Scalars['Null'];
  Number: Number;
  Group: Group;
  Members: Members;
  Sound: Sound;
  Policy: Policy;
  DateTime: Scalars['DateTime'];
  PolicyItems: PolicyItems;
  JSON: Scalars['JSON'];
  GeneralSettings: GeneralSettings;
  LocaleSettings: LocaleSettings;
  HoldMusic: HoldMusic;
  Logins: Logins;
  PolicySearchInput: PolicySearchInput;
  Template: Template;
  TemplateVariables: TemplateVariables;
  Voicemail: Voicemail;
  ccMailboxes: CcMailboxes;
  Mutation: {};
  CreateUser: CreateUser;
  UpdateUser: UpdateUser;
  createDevice: CreateDevice;
  updateDevice: UpdateDevice;
  updateNumber: UpdateNumber;
  deleteNumber: DeleteNumber;
  PositiveInt: Scalars['PositiveInt'];
  inputUpdateGeneralSettings: InputUpdateGeneralSettings;
  inputUpdateLocaleSettings: InputUpdateLocaleSettings;
  inputDeleteLocaleSettings: InputDeleteLocaleSettings;
  updateGroup: UpdateGroup;
  MembersInput: MembersInput;
  createGroup: CreateGroup;
  policyInput: PolicyInput;
  PolicyItemsInput: PolicyItemsInput;
  inputVoicemail: InputVoicemail;
  inputCCMailboxes: InputCcMailboxes;
  EmailAddress: Scalars['EmailAddress'];
  PhoneNumber: Scalars['PhoneNumber'];
  PostalCode: Scalars['PostalCode'];
  URL: Scalars['URL'];
  UserInput: UserInput;
  GroupLoggedIn: GroupLoggedIn;
  CoreApiUser: CoreApiUser;
};

export type CallLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['CallLog'] = ResolversParentTypes['CallLog']> = {
  timeStart?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fromUserId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fromNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  toNumberDialled?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  connectedTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  connectedToNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeRinging?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  timeTalking?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  direction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flags?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  policy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recording?: Resolver<Maybe<ResolversTypes['FileStream']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CcMailboxesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ccMailboxes'] = ResolversParentTypes['ccMailboxes']> = {
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CoreApiUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['CoreApiUser'] = ResolversParentTypes['CoreApiUser']> = {
  ID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  HomeOrgID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  UserName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  FirstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  MiddleNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  LastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PrimaryMobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PermissionLevel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Virgin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ArchivingScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  TwoFactorAuth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PreviousLoginDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PlaybackPerms?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  AvailabilityProfileID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  AvailabilityStateID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeviceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sipExtension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  macAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registered?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  registrationExpiry?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface FileStreamScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FileStream'], any> {
  name: 'FileStream';
}

export type GeneralSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralSettings'] = ResolversParentTypes['GeneralSettings']> = {
  orgId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxUsers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxDevices?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxConnectors?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxSIPTrunkLicenses?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  directNotifications?: Resolver<Maybe<ResolversTypes['DirectNotifications']>, ParentType, ContextType>;
  logCompliance?: Resolver<Maybe<ResolversTypes['LogCompliance']>, ParentType, ContextType>;
  twoFactorAuth?: Resolver<Maybe<ResolversTypes['TwoFactorAuth']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sipExtension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['Members']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GroupLoggedInResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupLoggedIn'] = ResolversParentTypes['GroupLoggedIn']> = {
  ID?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type HoldMusicResolvers<ContextType = any, ParentType extends ResolversParentTypes['HoldMusic'] = ResolversParentTypes['HoldMusic']> = {
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preset?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LocaleSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocaleSettings'] = ResolversParentTypes['LocaleSettings']> = {
  externalCallerIdNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  presentCallerId?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  holdMusic?: Resolver<Maybe<ResolversTypes['HoldMusic']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LoginsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Logins'] = ResolversParentTypes['Logins']> = {
  login?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MembersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Members'] = ResolversParentTypes['Members']> = {
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, never>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, never>>;
  createDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<MutationCreateDeviceArgs, never>>;
  updateDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<MutationUpdateDeviceArgs, never>>;
  deleteDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<MutationDeleteDeviceArgs, never>>;
  updateNumber?: Resolver<Maybe<ResolversTypes['Number']>, ParentType, ContextType, RequireFields<MutationUpdateNumberArgs, never>>;
  deleteNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteNumberArgs, never>>;
  updateGeneralSettings?: Resolver<Maybe<ResolversTypes['GeneralSettings']>, ParentType, ContextType, RequireFields<MutationUpdateGeneralSettingsArgs, never>>;
  updateLocaleSettings?: Resolver<Maybe<ResolversTypes['LocaleSettings']>, ParentType, ContextType, RequireFields<MutationUpdateLocaleSettingsArgs, never>>;
  deleteLocaleSettings?: Resolver<Maybe<ResolversTypes['LocaleSettings']>, ParentType, ContextType, RequireFields<MutationDeleteLocaleSettingsArgs, never>>;
  updateGroup?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<MutationUpdateGroupArgs, never>>;
  createGroup?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<MutationCreateGroupArgs, never>>;
  updateGroupUsers?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<MutationUpdateGroupUsersArgs, never>>;
  putPolicy?: Resolver<Maybe<ResolversTypes['Policy']>, ParentType, ContextType, RequireFields<MutationPutPolicyArgs, never>>;
  createPolicy?: Resolver<Maybe<ResolversTypes['Policy']>, ParentType, ContextType, RequireFields<MutationCreatePolicyArgs, never>>;
  updateVoicemail?: Resolver<Maybe<ResolversTypes['Voicemail']>, ParentType, ContextType, RequireFields<MutationUpdateVoicemailArgs, never>>;
};

export interface NullScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Null'], any> {
  name: 'Null';
}

export type NumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Number'] = ResolversParentTypes['Number']> = {
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  areaCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  areaName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  localNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  geographic?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  policyId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PaginatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Paginated'] = ResolversParentTypes['Paginated']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  prevIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  callLogs?: Resolver<Array<Maybe<ResolversTypes['CallLog']>>, ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  devices?: Resolver<Array<Maybe<ResolversTypes['Device']>>, ParentType, ContextType>;
  numbers?: Resolver<Array<Maybe<ResolversTypes['Number']>>, ParentType, ContextType>;
  usersExtended?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  groups?: Resolver<Array<Maybe<ResolversTypes['Group']>>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  sound?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sound']>>>, ParentType, ContextType>;
  policies?: Resolver<Array<Maybe<ResolversTypes['Policy']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export type PolicyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Policy'] = ResolversParentTypes['Policy']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['PolicyType']>, ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['PolicyItems']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PolicyItemsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolicyItems'] = ResolversParentTypes['PolicyItems']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  templateId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  variables?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  subItems?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  callLogsPaginated?: Resolver<ResolversTypes['Paginated'], ParentType, ContextType, RequireFields<QueryCallLogsPaginatedArgs, never>>;
  callLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['CallLog']>>>, ParentType, ContextType, RequireFields<QueryCallLogsArgs, never>>;
  usersPaginated?: Resolver<ResolversTypes['Paginated'], ParentType, ContextType, RequireFields<QueryUsersPaginatedArgs, never>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  devicesPaginated?: Resolver<ResolversTypes['Paginated'], ParentType, ContextType, RequireFields<QueryDevicesPaginatedArgs, never>>;
  devices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Device']>>>, ParentType, ContextType>;
  device?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<QueryDeviceArgs, never>>;
  numbersPaginated?: Resolver<Maybe<ResolversTypes['Paginated']>, ParentType, ContextType, RequireFields<QueryNumbersPaginatedArgs, never>>;
  numbers?: Resolver<Array<Maybe<ResolversTypes['Number']>>, ParentType, ContextType>;
  generalSettings?: Resolver<Maybe<ResolversTypes['GeneralSettings']>, ParentType, ContextType>;
  localeSettings?: Resolver<Maybe<ResolversTypes['LocaleSettings']>, ParentType, ContextType>;
  groupsPaginated?: Resolver<ResolversTypes['Paginated'], ParentType, ContextType, RequireFields<QueryGroupsPaginatedArgs, never>>;
  group?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QueryGroupArgs, never>>;
  groups?: Resolver<Array<Maybe<ResolversTypes['Group']>>, ParentType, ContextType>;
  groupMembersPaginated?: Resolver<ResolversTypes['Paginated'], ParentType, ContextType, RequireFields<QueryGroupMembersPaginatedArgs, never>>;
  groupLoggedIn?: Resolver<Maybe<ResolversTypes['Logins']>, ParentType, ContextType, RequireFields<QueryGroupLoggedInArgs, 'id'>>;
  soundPaginated?: Resolver<Maybe<ResolversTypes['Paginated']>, ParentType, ContextType, RequireFields<QuerySoundPaginatedArgs, never>>;
  sound?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sound']>>>, ParentType, ContextType>;
  health?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  policiesPaginated?: Resolver<ResolversTypes['Paginated'], ParentType, ContextType, RequireFields<QueryPoliciesPaginatedArgs, never>>;
  policies?: Resolver<Array<Maybe<ResolversTypes['Policy']>>, ParentType, ContextType>;
  policy?: Resolver<Maybe<ResolversTypes['Policy']>, ParentType, ContextType, RequireFields<QueryPolicyArgs, never>>;
  template?: Resolver<Maybe<ResolversTypes['Template']>, ParentType, ContextType, RequireFields<QueryTemplateArgs, never>>;
  templates?: Resolver<Array<Maybe<ResolversTypes['Template']>>, ParentType, ContextType>;
  voicemail?: Resolver<Maybe<ResolversTypes['Voicemail']>, ParentType, ContextType, RequireFields<QueryVoicemailArgs, never>>;
};

export type SoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sound'] = ResolversParentTypes['Sound']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  variables?: Resolver<Maybe<ResolversTypes['TemplateVariables']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TemplateVariablesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemplateVariables'] = ResolversParentTypes['TemplateVariables']> = {
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  additionalProperties?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  properties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middleNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sipExtension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryMobileNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissionLevel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  primaryGroupId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  availabilityProfileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  availabilityStateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberOf?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  sipDevices?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  pciEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  scopes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  connectedTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  connectedToNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loggedIn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VoicemailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Voicemail'] = ResolversParentTypes['Voicemail']> = {
  emailNotification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  emailTo?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  emailAttachFile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  emailKeepFile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  ccMailboxes?: Resolver<Maybe<ResolversTypes['ccMailboxes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  CallLog?: CallLogResolvers<ContextType>;
  ccMailboxes?: CcMailboxesResolvers<ContextType>;
  CoreApiUser?: CoreApiUserResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Device?: DeviceResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  FileStream?: GraphQLScalarType;
  GeneralSettings?: GeneralSettingsResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  GroupLoggedIn?: GroupLoggedInResolvers<ContextType>;
  HoldMusic?: HoldMusicResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LocaleSettings?: LocaleSettingsResolvers<ContextType>;
  Logins?: LoginsResolvers<ContextType>;
  Members?: MembersResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Null?: GraphQLScalarType;
  Number?: NumberResolvers<ContextType>;
  Paginated?: PaginatedResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Policy?: PolicyResolvers<ContextType>;
  PolicyItems?: PolicyItemsResolvers<ContextType>;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Sound?: SoundResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
  TemplateVariables?: TemplateVariablesResolvers<ContextType>;
  Time?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Voicemail?: VoicemailResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
