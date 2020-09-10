import { getResultsFilteredByKeys, CompareTypes } from "@/utils/tools"
import { keys } from "ramda"
import { Policy } from "@/resolvers-types"

const { getPaginatedResults } = require("@/utils/tools")

const getFilteredLogs = (policies, searchInput) =>
  getResultsFilteredByKeys<Policy>(
    policies,
    keys(searchInput)
      .filter(x => x)
      .reduce((acc, curkey) => {
        return {
          ...acc,
          [curkey]: searchInput[curkey],
        }
      }, {}),
    {},
    CompareTypes.LIKE,
  )

const resolvers = {
  Query: {
    policiesPaginated: async (
      root,
      { index, length, searchInput, type },
      context,
    ) => {
      context.logger.debug("Start of Resolver Policy.policiesPaginated")
      const result = await context.dataSources.sapienAPI.getPolicies()
      let resultData = result.data

      // first off filter down to only the type we need.
      if (type) {
        resultData = resultData.filter(d => d.type === type)
      }

      // then filter further by searchInput
      if (searchInput && Object.keys(searchInput).length !== 0) {
        resultData = getFilteredLogs(resultData, searchInput)
      }

      return getPaginatedResults({
        index,
        length,
        results: resultData.reverse(),
        dynamicKey: "policies",
      })
    },
    policies: async (root, args, context) => {
      context.logger.debug("Start of Resolver Policy.policies")
      const result = await context.dataSources.sapienAPI.getPolicies()

      return result.data
    },
    policy: async (root, { id }, context) => {
      context.logger.debug("Start of Resolver Policy.policy")
      const result = await context.dataSources.sapienAPI.getPolicyById(id)

      return result.data
    },
  },
  Mutation: {
    createPolicy: async (root, { policy }, context) => {
      context.logger.debug("Start of Resolver Policy.createPolicy")
      const result = await context.dataSources.sapienAPI.postPolicy(policy)

      return result.data
    },
    putPolicy: async (root, { id, policy }, context) => {
      context.logger.debug("Start of Resolver Policy.putPolicy")
      const result = await context.dataSources.sapienAPI.putPolicy(id, policy)

      return result.data
    },
  },
  Policy: {
    id: (obj, args, context) => {
      context.logger.silly("Start of Policy.id", { meta: obj })
      return obj.id
    },
    name: (obj, args, context) => {
      context.logger.silly("Start of Policy.name", { meta: obj })
      return obj.name
    },
    enabled: (obj, args, context) => {
      context.logger.silly("Start of Policy.enabled", { meta: obj })
      return obj.enabled
    },
    type: (obj, args, context) => {
      context.logger.silly("Start of Policy.type", { meta: obj })
      return obj.type
    },
    created: (obj, args, context) => {
      context.logger.silly("Start of Policy.created", { meta: obj })
      return obj.created
    },
    modified: (obj, args, context) => {
      context.logger.silly("Start of Policy.modified", { meta: obj })
      return obj.modified
    },
  },
}

export default resolvers
