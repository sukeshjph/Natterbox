const resolvers = {
  Query: {
    defaultPolicies: async (root, args, context) => {
      context.logger.debug("Start of Resolver Archiving.defaultPolicies")
      const defaultPolicies = await context.dataSources.coreAPI.getDefaultPolicies()

      return defaultPolicies
    },
    endpoints: async (root, args, context) => {
      context.logger.debug("Start of Resolver Archiving.endpoints")
      const endpoints = await context.dataSources.coreAPI.getAllEndpoints()

      return endpoints
    },
    orgPolicies: async (root, args, context) => {
      context.logger.debug("Start of Resolver Archiving.orgPolicies")
      const orgPolicies = await context.dataSources.coreAPI.getAllOrgPolicies()

      return orgPolicies
    },
  },
  Mutation: {
    createArchivingPolicy: async (roots, args, context) => {
      const policyResult = await context.dataSources.coreAPI.createOrgPolicy(
        args.policyToCreate,
      )

      return policyResult
    },
  },
}

export default resolvers
