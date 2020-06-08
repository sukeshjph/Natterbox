const { getPaginatedResults } = require("@/utils/tools")

const resolvers = {
  Query: {
    groupsPaginated: async (root, {index, length }, context) => {
      context.logger.debug("Start of Resolver Group.groups")
      const groups = await context.dataSources.sapienAPI.getGroups()

      return getPaginatedResults({
        index,
        length,
        results: groups.data.reverse(),
        dynamicKey: 'groups'
      })
    }
  },
  Group: {
    id: (obj, args, context) => {
      context.logger.silly("Start of Group.id", { meta: obj })
      return obj.id
    },
    name: (obj, args, context) => {
      context.logger.silly("Start of Group.name", {meta: obj})
      return obj.name
    },
    sipExtension: (obj, args, context) => {
      context.logger.silly("Start of Group.sipExtension", { meta: obj })
      return obj.sipExtension
    },
    category: (obj, args, context) => {
      context.logger.silly("Start of Group.category", { meta: obj })
      return obj.category
    },
    system: (obj, args, context) => {
      context.logger.silly("Start of Group.system", { meta: obj })
      return obj.system
    },
  },
}

export default resolvers
