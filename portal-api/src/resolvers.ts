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
import sound from "@domains/sound"
import numbers from "@domains/numbers"
import generalSettings from "@domains/generalSettings"
import health from "@domains/health"
import groups from "@domains/groups"
import policies from "@domains/policies"
import templates from "@domains/templates"
import voicemail from "@domains/voicemail"
import archiving from "@domains/archiving"

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
  sound.resolvers,
  health.resolvers,
  policies.resolvers,
  templates.resolvers,
  voicemail.resolvers,
  archiving.resolvers,
] as Resolvers[]
