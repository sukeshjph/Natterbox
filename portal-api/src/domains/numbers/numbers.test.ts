import logger from "@plugins/winston"
import SapienAPI from "@dataSources/sapienAPI"
import deviceResolvers from "./resolvers"

const obj = {
  number: "331123645",
  countryCode: "33",
  areaCode: "1",
  areaName: "Paris",
  localNumber: "123645",
  geographic: true,
  userId: null,
  policyId: null,
  label: "JeMareque",
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

test("Number.number", () => {
  const output = deviceResolvers.Number.number(obj, args, context)
  expect(output).toEqual("331123645")
})

test("Number.countryCode", () => {
  const output = deviceResolvers.Number.countryCode(obj, args, context)
  expect(output).toEqual("33")
})

test("Number.areaCode", () => {
  const output = deviceResolvers.Number.areaCode(obj, args, context)
  expect(output).toEqual("1")
})

test("Number.areaName", () => {
  const output = deviceResolvers.Number.areaName(obj, args, context)
  expect(output).toEqual("Paris")
})

test("Number.localNumber", () => {
  const output = deviceResolvers.Number.localNumber(obj, args, context)
  expect(output).toEqual("123645")
})

test("Number.geographic", () => {
  const output = deviceResolvers.Number.geographic(obj, args, context)
  expect(output).toEqual(true)
})

test("Number.userId", () => {
  const output = deviceResolvers.Number.userId(obj, args, context)
  expect(output).toEqual(null)
})

test("Number.policyId", () => {
  const output = deviceResolvers.Number.policyId(obj, args, context)
  expect(output).toEqual(null)
})

test("Number.label", () => {
  const output = deviceResolvers.Number.label(obj, args, context)
  expect(output).toEqual("JeMareque")
})
