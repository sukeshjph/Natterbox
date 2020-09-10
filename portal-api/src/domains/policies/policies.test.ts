import logger from "@plugins/winston"
import SapienAPI from "@dataSources/sapienAPI"
import policiesResolvers from "./resolvers"

const obj = {
    "id": 798,
    "name": "Mobile (From)",
    "enabled": true,
    "type": "CALL",
    "created": "2015-08-06T13:03:53+00:00",
    "modified": "2015-08-06T12:03:53+00:00"
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

test("Policy.id", () => {
  const output = policiesResolvers.Policy.id(obj, args, context)
  expect(output).toEqual(798)
})

test("Policy.name", () => {
  const output = policiesResolvers.Policy.name(obj, args, context)
  expect(output).toEqual("Mobile (From)")
})

test("Policy.enabled", () => {
  const output = policiesResolvers.Policy.enabled(obj, args, context)
  expect(output).toEqual(true)
})

test("Policy.type", () => {
  const output = policiesResolvers.Policy.type(obj, args, context)
  expect(output).toEqual("CALL")
})

test("Policy.created", () => {
  const output = policiesResolvers.Policy.created(obj, args, context)
  expect(output).toEqual("2015-08-06T13:03:53+00:00")
})

test("Policy.modified", () => {
  const output = policiesResolvers.Policy.modified(obj, args, context)
  expect(output).toEqual("2015-08-06T12:03:53+00:00")
})
