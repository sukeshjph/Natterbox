const resolvers = {
  Query: {
    templates: async (root, args, context) => {
      context.logger.debug("Start of Resolver Policy.policies")
      const result = await context.dataSources.sapienAPI.getTemplates()

      return result.data
    },
    template: async (root, { id }, context) => {
      context.logger.debug("Start of Resolver Policy.policy")
      const result = await context.dataSources.sapienAPI.getTemplate(id)

      return result.data
    },
  },
  TemplateVariables: {
    type: (obj, args, context) => {
      context.logger.silly("Start of Template.type", { meta: obj })
      return obj.type
    },
    additionalProperties: (obj, args, context) => {
      context.logger.silly("Start of Template.additionalProperties", {
        meta: obj,
      })
      return obj.additionalProperties
    },
    properties: (obj, args, context) => {
      context.logger.silly("Start of Template.properties", { meta: obj })
      return obj.properties
    },
  },
  Template: {
    id: (obj, args, context) => {
      context.logger.silly("Start of Template.id", { meta: obj })
      return obj.id
    },
    type: (obj, args, context) => {
      context.logger.silly("Start of Template.type", { meta: obj })
      return obj.type
    },
    parent: (obj, args, context) => {
      context.logger.silly("Start of Template.parent", { meta: obj })
      return obj.parent
    },
    name: (obj, args, context) => {
      context.logger.silly("Start of Template.name", { meta: obj })
      return obj.name
    },
    description: (obj, args, context) => {
      context.logger.silly("Start of Template.description", { meta: obj })
      return obj.description
    },
  },
}

export default resolvers
