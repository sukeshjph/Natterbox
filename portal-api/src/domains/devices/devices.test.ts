import logger from "@plugins/winston"
import SapienAPI from "@dataSources/sapienAPI"
import deviceResolvers from "./resolvers"

const obj = {
  id: 399,
  macAddress: "45006594d4b3",
  sipExtension: "12000",
  registered: false,
  registrationExpiry: "2019-10-17T00:22:37+00:00",
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

test("Device.id", () => {
  const output = deviceResolvers.Device.id(obj, args, context)
  expect(output).toEqual(399)
})

test("Device.sipExtension", () => {
  const output = deviceResolvers.Device.sipExtension(obj, args, context)
  expect(output).toEqual("12000")
})

test("Device.description", () => {
  const output = deviceResolvers.Device.description(obj, args, context)
  expect(output).toEqual(undefined)
})

test("Device.location", () => {
  const output = deviceResolvers.Device.location(obj, args, context)
  expect(output).toEqual(undefined)
})

test("Device.enabled", () => {
  const output = deviceResolvers.Device.enabled(obj, args, context)
  expect(output).toEqual(undefined)
})

test("Device.macAddress", () => {
  const output = deviceResolvers.Device.macAddress(obj, args, context)
  expect(output).toEqual("45006594d4b3")
})

test("Device.registered", () => {
  const output = deviceResolvers.Device.registered(obj, args, context)
  expect(output).toEqual(false)
})

test("Device.registrationExpiry", () => {
  const output = deviceResolvers.Device.registrationExpiry(obj, args, context)
  expect(output).toEqual("2019-10-17T00:22:37+00:00")
})
