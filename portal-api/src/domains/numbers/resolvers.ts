const { getPaginatedResults } = require("@/utils/tools")

const resolvers = {
  Mutation: {
    updateNumber: async (root, args, context) => {
      context.logger.debug("Start of resolver Device.updateNumber", {
        meta: args,
      })

      const result = await context.dataSources.sapienAPI.updateNumber(
        args.id,
        args.number,
      )

      return result.data
    },
    deleteNumber: async (root, { countryCode, number}, context) => {
      context.logger.debug("Start of resolver Number.deleteNumber", {
        meta: {
          number,
          countryCode
        }
      })

      const result = await context.dataSources.coreAPI.deleteNumber(
        countryCode,
        number,
      )

      console.log(`Delete number`, JSON.stringify(result))
      return result
    },
  },
  Query: {
    numbersPaginated: async (root, { index, length }, context) => {
      context.logger.debug("Start of Resolver Numbers.numbersPaginated")
      const totalRecords = await context.dataSources.sapienAPI.getNumbers()

      return getPaginatedResults({
        index,
        length,
        results: totalRecords.data.reverse(),
        dynamicKey: "numbers",
      })
    },
    numbers: async (root, args, context) => {
      context.logger.debug("Start of Resolver Numbers.numbers")
      const allNumbers = await context.dataSources.sapienAPI.getNumbers()
      return allNumbers.data
    },
  },
  Number: {
    number: (obj, args, context) => {
      context.logger.debug("Start of Number.number", { meta: obj })
      return obj.number
    },
    countryCode: (obj, args, context) => {
      context.logger.debug("Start of Number.countryCode", { meta: obj })
      return obj.countryCode
    },
    areaCode: (obj, args, context) => {
      context.logger.debug("Start of Number.areaCode", { meta: obj })
      return obj.areaCode
    },
    areaName: (obj, args, context) => {
      context.logger.debug("Start of Number.areaName", { meta: obj })
      return obj.areaName
    },
    localNumber: (obj, args, context) => {
      context.logger.debug("Start of Number.localNumber", { meta: obj })
      return obj.localNumber
    },
    geographic: (obj, args, context) => {
      context.logger.debug("Start of Number.geographic", { meta: obj })
      return obj.geographic
    },
    userId: (obj, args, context) => {
      context.logger.debug("Start of Number.userId", { meta: obj })
      return obj.userId
    },
    policyId: (obj, args, context) => {
      context.logger.debug("Start of Number.policyId", { meta: obj })
      return obj.policyId
    },
    label: (obj, args, context) => {
      context.logger.debug("Start of Number.label", { meta: obj })
      return obj.label
    },
  },
}

export default resolvers
