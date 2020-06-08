import {
  DateTimeResolver,
  EmailAddressResolver,
  PhoneNumberResolver,
  PostalCodeResolver,
  PositiveIntResolver,
  URLResolver,
} from "graphql-scalars"

import callLogs from "@domains/callLogs"
import users from "@domains/users"
import devices from "@domains/devices"
import numbers from "@domains/numbers"
import generalSettings from "@domains/generalSettings"
import groups from "@domains/groups"
import { Resolvers } from "./resolvers-types"

export default [
  //  from graphql-scalars
  {
    DateTime: DateTimeResolver,
    EmailAddress: EmailAddressResolver,
    PhoneNumber: PhoneNumberResolver,
    PostalCode: PostalCodeResolver,
    PositiveInt: PositiveIntResolver,
    URL: URLResolver,
  },
  callLogs.resolvers,
  users.resolvers,
  devices.resolvers,
  numbers.resolvers,
  generalSettings.resolvers,
  groups.resolvers,
] as Resolvers[]
