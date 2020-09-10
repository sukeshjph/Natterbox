const resolvers = {
  Query: {
    health: async (root, args, context) => {
      context.logger.debug("Start of resolver Health.health")
      const coreApi = await context.dataSources.coreAPI.getUsersMe()
      const sapienApi = await context.dataSources.sapienAPI.getTest()

      return !!(coreApi && sapienApi)
    }
  }
}

export default resolvers
