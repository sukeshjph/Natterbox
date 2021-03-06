import { gql } from "apollo-server-lambda"

import callLogs from "@domains/callLogs"
import users from "@domains/users"
import devices from "@domains/devices"
import numbers from "@domains/numbers"
import generalSettings from "@domains/generalSettings"
import groups from "@domains/groups"
import sound from "@domains/sound"
import health from "@domains/health"
import policies from "@domains/policies"
import templates from "@domains/templates"
import voicemail from "@domains/voicemail"
import archiving from "@domains/archiving"

const typeDef = gql`
  scalar Date
  scalar Time
  scalar FileStream
  scalar Null
  scalar JSON

  #  from graphql-scalars
  scalar DateTime
  scalar EmailAddress
  scalar PhoneNumber
  scalar PostalCode
  scalar PositiveInt
  scalar URL

  type Query
  type Mutation

  type Paginated {
    hasMore: Boolean!
    firstIndex: Int
    lastIndex: Int
    prevIndex: Int
    nextIndex: Int
    count: Int
  }
`

export default [
  typeDef,
  callLogs.typeDef,
  users.typeDef,
  devices.typeDef,
  numbers.typeDef,
  generalSettings.typeDef,
  groups.typeDef,
  sound.typeDef,
  health.typeDef,
  policies.typeDef,
  templates.typeDef,
  voicemail.typeDef,
  archiving.typeDef,
]
