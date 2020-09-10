import { keys, isNil } from "ramda"
import { parseISO, isAfter, isBefore } from "date-fns"
import { getResultsFilteredByKeys } from "@/utils/tools"
import { CallLog } from "@/resolvers-types"

const { getPaginatedResults } = require("@/utils/tools")

type CallogExtended = CallLog & {
  aUuid: string
  bUuid: string
}

const getFilteredLogs = (callLogs, searchInput) =>
  getResultsFilteredByKeys<CallogExtended>(
    callLogs,
    keys(searchInput)
      .filter(x => x)
      .reduce(
        (acc, curkey) => ({
          ...acc,
          [curkey]: searchInput[curkey],
        }),
        {},
      ),
    {
      startTime: item => {
        const { startTime } = searchInput
        return isNil(startTime)
          ? item
          : isAfter(parseISO(item.timeStart), parseISO(startTime))
      },
      endTime: item => {
        const { endTime } = searchInput
        return isNil(endTime)
          ? item
          : isBefore(parseISO(item.timeStart), parseISO(endTime))
      },
      uuid: item => {
        const { aUuid, bUuid } = item
        let foundMatch = false

        if (aUuid && searchInput.uuid === aUuid) {
          foundMatch = true
        }

        if (bUuid && searchInput.uuid === bUuid) {
          foundMatch = true
        }

        return foundMatch
      },
    },
  )

const resolvers = {
  Query: {
    callLogsPaginated: async (
      root,
      { index, length, searchInput },
      context,
    ) => {
      context.logger.debug("Start of resolver CallLog.callLogs")
      const logs = await context.dataSources.sapienAPI.getCallLogs()
      let logsData = logs.data

      if (searchInput && Object.keys(searchInput).length !== 0) {
        logsData = getFilteredLogs(logsData, searchInput)
      }

      return getPaginatedResults({
        index,
        length,
        results: logsData.reverse(),
        dynamicKey: "callLogs",
      })
    },
    callLogs: async (root, args, context) => {
      context.logger.debug("Start of resolver CallLog.callLogs")
      const logs = await context.dataSources.sapienAPI.getCallLogs()

      const { searchInput } = args

      if (searchInput && Object.keys(searchInput).length !== 0) {
        return getFilteredLogs(logs.data, searchInput)
      }

      return logs.data
    },
  },

  CallLog: {
    timeStart: (obj, args, context) => {
      context.logger.silly("Start of CallLog.timeStart", { meta: obj })
      return obj.timeStart
    },
    fromNumber: (obj, args, context) => {
      context.logger.silly("Start of CallLog.from", { meta: obj })
      return obj.fromNumber
    },
    fromUserId: (obj, args, context) => {
      context.logger.silly("Start of CallLog.fromUserId", { meta: obj })
      return obj.fromUserId
    },
    toNumberDialled: (obj, args, context) => {
      context.logger.silly("Start of CallLog.dialled", { meta: obj })
      return obj.toNumberDialled
    },
    connectedTo: async (obj, args, context) => {
      context.logger.silly("Start of CallLog.connectedTo", { meta: obj })

      if (obj.bUuid !== null) {
        let user = {
          data: {
            firstName: "",
            lastName: "",
          },
        }

        switch (obj.direction) {
          case "OUTBOUND":
            user = await context.dataSources.sapienAPI.getUserById(
              obj.fromUserId,
            )
            break
          case "INBOUND":
            user = await context.dataSources.sapienAPI.getUserById(obj.toUserId)
            break
          case "SERVICE":
            user = await context.dataSources.sapienAPI.getUserById(
              obj.fromUserId,
            )
            break
          case "INTERNAL":
            user = await context.dataSources.sapienAPI.getUserById(obj.toUserId)
            break
          default:
            break
        }
        if (user.data) return `${user.data.firstName} ${user.data.lastName}`
      }
      return null
    },
    connectedToNumber: async (obj, args, context) => {
      context.logger.silly("Start of CallLog.connectedToNumber", { meta: obj })
      if (obj.bUuid !== null) {
        let user = {
          data: {
            primaryMobileNumber: "",
          },
        }
        switch (obj.direction) {
          case "OUTBOUND":
            user = await context.dataSources.sapienAPI.getUserById(
              obj.fromUserId,
            )
            break
          case "INBOUND":
            user = await context.dataSources.sapienAPI.getUserById(obj.toUserId)
            break
          case "SERVICE":
            user = await context.dataSources.sapienAPI.getUserById(
              obj.fromUserId,
            )
            break
          case "INTERNAL":
            user = await context.dataSources.sapienAPI.getUserById(obj.toUserId)
            break
          default:
            break
        }
        if (user.data) return user.data.primaryMobileNumber
      }
      return null
    },
    timeRinging: (obj, args, context) => {
      context.logger.silly("Start of CallLog.timeRinging", { meta: obj })
      return obj.timeRinging
    },
    timeTalking: (obj, args, context) => {
      context.logger.silly("Start of CallLog.timeTalking", { meta: obj })
      return obj.timeTalking
    },
    direction: (obj, args, context) => {
      context.logger.silly("Start of CallLog.direction", { meta: obj })
      return obj.direction
    },
    type: (obj, args, context) => {
      context.logger.silly("Start of CallLog.type", { meta: obj })
      if (obj.bUuid !== null) {
        return "Connected"
      }

      return "Not connected"
    },
    flags: (obj, args, context) => {
      context.logger.silly("Start of CallLog.flags", { meta: obj })
      if (obj.aFlags.length > 0) {
        return "YES"
      }

      return "NO"
    },
    policy: async (obj, args, context) => {
      context.logger.silly("Start of CallLog.policy", { meta: obj })
      if (obj.policyId) {
        const policy = await context.dataSources.sapienAPI.getPolicyById(
          obj.policyId,
        )
        if (policy && policy.data) return policy.data.name
      }
      return null
    },
    recording: (obj, args, context) => {
      context.logger.silly("Start of CallLog.recording", { meta: obj })
      let aRecording
      let bRecording

      // if recording in aFlags then save aUuid
      if (obj.aFlags.includes("RECORDED")) {
        aRecording = obj.aUuid
      }

      // if recording in bFlags then save bUuid
      if (obj.bFlags.includes("RECORDED")) {
        bRecording = obj.bUuid
      }

      return {
        aUuid: aRecording,
        bUuid: bRecording,
      }
    },
  },
}

export default resolvers
