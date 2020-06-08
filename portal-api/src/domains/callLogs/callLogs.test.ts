import logger from "@plugins/winston"
import SapienAPI from "@dataSources/sapienAPI"
import callLogResolvers from "./resolvers"

const obj = {
  aUuid: "4da9e7ee-6937-11ea-91d4-e102edb22f0f",
  aFlags: ["LISTEN_IN_ENABLED", "RECORDED"],
  bUuid: "67a601c2-692e-11ea-8b88-e102edb22f0f",
  bFlags: [],
  timeStart: "2020-03-18T16:41:23+00:00",
  timeHunting: 0,
  timeRinging: 1,
  timeTalking: 8,
  direction: "SERVICE",
  policyId: 68787,
  fromUserId: 878515,
  fromSipDeviceId: 31666,
  toUserId: null,
  toSipDeviceId: null,
  fromNumber: "2004",
  toNumber: null,
  toNumberDialled: "CPBXListenInService",
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

test("CallLog.timeStart", () => {
  const output = callLogResolvers.CallLog.timeStart(obj, args, context)
  expect(output).toEqual("2020-03-18T16:41:23+00:00")
})

test("CallLog.fromNumber", () => {
  const output = callLogResolvers.CallLog.fromNumber(obj, args, context)
  expect(output).toEqual("2004")
})

test("CallLog.toNumberDialled", () => {
  const output = callLogResolvers.CallLog.toNumberDialled(obj, args, context)
  expect(output).toEqual("CPBXListenInService")
})

test.skip("CallLog.connectedTo", async () => {
  const output = await callLogResolvers.CallLog.connectedTo(obj, args, context)
  expect(output).toEqual("Marek Dziekan")
})

test.skip("CallLog.connectedToNumber", async () => {
  const output = await callLogResolvers.CallLog.connectedToNumber(
    obj,
    args,
    context,
  )
  expect(output).toEqual("07555555555")
})

test("CallLog.timeRinging", () => {
  const output = callLogResolvers.CallLog.timeRinging(obj, args, context)
  expect(output).toEqual(1)
})

test("CallLog.timeTalking", () => {
  const output = callLogResolvers.CallLog.timeTalking(obj, args, context)
  expect(output).toEqual(8)
})

test("CallLog.direction", () => {
  const output = callLogResolvers.CallLog.direction(obj, args, context)
  expect(output).toEqual("SERVICE")
})

test("CallLog.type", () => {
  const output = callLogResolvers.CallLog.type(obj, args, context)
  expect(output).toEqual("Connected")
})

test("CallLog.flags", () => {
  const output = callLogResolvers.CallLog.flags(obj, args, context)
  expect(output).toEqual("YES")
})

test("CallLog.policy", async () => {
  const output = await callLogResolvers.CallLog.policy(obj, args, context)
  expect(output).toEqual("Abi Policy 1")
})

test("CallLog.recording", () => {
  const output = callLogResolvers.CallLog.recording(obj, args, context)
  expect(output).toEqual({ aUuid: "4da9e7ee-6937-11ea-91d4-e102edb22f0f" })
})
