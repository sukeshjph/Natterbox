import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

export type Maybe<T> = T | null;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

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

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Query: ResolverTypeWrapper<{}>,
  CallLog: ResolverTypeWrapper<CallLog>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Time: ResolverTypeWrapper<Scalars['Time']>,
  FileStream: ResolverTypeWrapper<Scalars['FileStream']>,
  CallLogSearchInput: CallLogSearchInput,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Device: ResolverTypeWrapper<Device>,
  Null: ResolverTypeWrapper<Scalars['Null']>,
  Paginated: ResolverTypeWrapper<Paginated>,
  Number: ResolverTypeWrapper<Number>,
  Group: ResolverTypeWrapper<Group>,
  GeneralSettings: ResolverTypeWrapper<GeneralSettings>,
  HoldMusic: ResolverTypeWrapper<HoldMusic>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateUser: CreateUser,
  UpdateUser: UpdateUser,
  createDevice: CreateDevice,
  updateDevice: UpdateDevice,
  updateNumber: UpdateNumber,
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>,
  inputUpdateGSettings: InputUpdateGSettings,
  inputDeleteGSettings: InputDeleteGSettings,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>,
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>,
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>,
  URL: ResolverTypeWrapper<Scalars['URL']>,
  Flags: Flags,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  CallLog: CallLog,
  Date: Scalars['Date'],
  String: Scalars['String'],
  Time: Scalars['Time'],
  FileStream: Scalars['FileStream'],
  CallLogSearchInput: CallLogSearchInput,
  Int: Scalars['Int'],
  User: User,
  ID: Scalars['ID'],
  Boolean: Scalars['Boolean'],
  Device: Device,
  Null: Scalars['Null'],
  Paginated: Paginated,
  Number: Number,
  Group: Group,
  GeneralSettings: GeneralSettings,
  HoldMusic: HoldMusic,
  Mutation: {},
  CreateUser: CreateUser,
  UpdateUser: UpdateUser,
  createDevice: CreateDevice,
  updateDevice: UpdateDevice,
  updateNumber: UpdateNumber,
  PositiveInt: Scalars['PositiveInt'],
  inputUpdateGSettings: InputUpdateGSettings,
  inputDeleteGSettings: InputDeleteGSettings,
  DateTime: Scalars['DateTime'],
  EmailAddress: Scalars['EmailAddress'],
  PhoneNumber: Scalars['PhoneNumber'],
  PostalCode: Scalars['PostalCode'],
  URL: Scalars['URL'],
  Flags: Flags,
};

export type CallLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['CallLog'] = ResolversParentTypes['CallLog']> = {
  timeStart?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  fromNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  toNumberDialled?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  connectedTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  connectedToNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  timeRinging?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>,
  timeTalking?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>,
  direction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  flags?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  policy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  recording?: Resolver<Maybe<ResolversTypes['FileStream']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type DeviceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  sipExtension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  macAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  registered?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  registrationExpiry?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  password?: Resolver<Maybe<ResolversTypes['Null']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export interface FileStreamScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FileStream'], any> {
  name: 'FileStream'
}

export type GeneralSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralSettings'] = ResolversParentTypes['GeneralSettings']> = {
  externalCallerIdNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  presentCallerId?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  voice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  holdMusic?: Resolver<Maybe<ResolversTypes['HoldMusic']>, ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  sipExtension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  system?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type HoldMusicResolvers<ContextType = any, ParentType extends ResolversParentTypes['HoldMusic'] = ResolversParentTypes['HoldMusic']> = {
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  preset?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>,
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>,
  createDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<MutationCreateDeviceArgs, never>>,
  updateDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<MutationUpdateDeviceArgs, never>>,
  deleteDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<MutationDeleteDeviceArgs, never>>,
  updateNumber?: Resolver<Maybe<ResolversTypes['Number']>, ParentType, ContextType, RequireFields<MutationUpdateNumberArgs, never>>,
  updateGeneralSettings?: Resolver<Maybe<ResolversTypes['GeneralSettings']>, ParentType, ContextType, RequireFields<MutationUpdateGeneralSettingsArgs, never>>,
  deleteGeneralSettings?: Resolver<Maybe<ResolversTypes['GeneralSettings']>, ParentType, ContextType, RequireFields<MutationDeleteGeneralSettingsArgs, never>>,
};

export interface NullScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Null'], any> {
  name: 'Null'
}

export type NumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Number'] = ResolversParentTypes['Number']> = {
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  areaCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  areaName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  localNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  geographic?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  policyId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PaginatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Paginated'] = ResolversParentTypes['Paginated']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  firstIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  lastIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  prevIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  nextIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  numbers?: Resolver<Array<Maybe<ResolversTypes['Number']>>, ParentType, ContextType>,
  groups?: Resolver<Array<Maybe<ResolversTypes['Group']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber'
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt'
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode'
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  callLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['CallLog']>>>, ParentType, ContextType>,
  callLogsWithSearch?: Resolver<Maybe<Array<Maybe<ResolversTypes['CallLog']>>>, ParentType, ContextType, RequireFields<QueryCallLogsWithSearchArgs, 'searchInput'>>,
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  devices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Device']>>>, ParentType, ContextType>,
  device?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<QueryDeviceArgs, never>>,
  numbersPaginated?: Resolver<ResolversTypes['Paginated'], ParentType, ContextType, RequireFields<QueryNumbersPaginatedArgs, never>>,
  numbers?: Resolver<Array<Maybe<ResolversTypes['Number']>>, ParentType, ContextType>,
  generalSettings?: Resolver<Maybe<ResolversTypes['GeneralSettings']>, ParentType, ContextType>,
  groupsPaginated?: Resolver<ResolversTypes['Paginated'], ParentType, ContextType, RequireFields<QueryGroupsPaginatedArgs, never>>,
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time'
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  middleNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  sipExtension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  primaryMobileNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  permissionLevel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  primaryGroupId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  availabilityProfileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  availabilityStateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  memberOf?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  sipDevices?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  pciEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  scopes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  connectedTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  connectedToNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  CallLog?: CallLogResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  Device?: DeviceResolvers<ContextType>,
  EmailAddress?: GraphQLScalarType,
  FileStream?: GraphQLScalarType,
  GeneralSettings?: GeneralSettingsResolvers<ContextType>,
  Group?: GroupResolvers<ContextType>,
  HoldMusic?: HoldMusicResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Null?: GraphQLScalarType,
  Number?: NumberResolvers<ContextType>,
  Paginated?: PaginatedResolvers<ContextType>,
  PhoneNumber?: GraphQLScalarType,
  PositiveInt?: GraphQLScalarType,
  PostalCode?: GraphQLScalarType,
  Query?: QueryResolvers<ContextType>,
  Time?: GraphQLScalarType,
  URL?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
