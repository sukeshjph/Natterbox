import logger from "@plugins/winston"
import SapienAPI from "@dataSources/sapienAPI"
import groupsResolvers from "./resolvers"

const obj = {
  "name": "Support",
  "system": false,
  "category": "cloudpbx",
  "sipExtension": "2564",
  "emailAddress": "mail@mail.com",
  "members": {
    "users": [
      7349,
      7657,
      7776,
      7819,
      7999,
      8061,
      8290
    ]
  }
}

const args = {}
const context = {
  logger,
  dataSources: {
    sapienAPI: new (class extends SapienAPI {
      constructor() {
        super()
        this.context = {
          logger,
          authContext: {
            orgID: 1234,
          },
        }
      }
    })(),
  },
}

test("Group.id", () => {
  const output = groupsResolvers.Group.id(obj, args, context)
  expect(output).toEqual(undefined)
})

test("Group.name", () => {
  const output = groupsResolvers.Group.name(obj, args, context)
  expect(output).toEqual("Support")
})

test("Group.sipExtension", () => {
  const output = groupsResolvers.Group.sipExtension(obj, args, context)
  expect(output).toEqual("2564")
})

test("Group.category", () => {
  const output = groupsResolvers.Group.category(obj, args, context)
  expect(output).toEqual("cloudpbx")
})

test("Group.system", () => {
  const output = groupsResolvers.Group.system(obj, args, context)
  expect(output).toEqual(false)
})
