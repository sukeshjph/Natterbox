const { getPaginatedResults } = require("@/utils/tools")

const resolvers = {
  Query: {
    soundPaginated: async (root, { index, length }, context) => {
      context.logger.debug("Start of Resolver Sound.soundPaginated")
      const sound = await context.dataSources.sapienAPI.getAllSound()

      return getPaginatedResults({
        index,
        length,
        results: sound.data.reverse(),
        dynamicKey: "sound",
      })
    },
    sound: async (root, args, context) => {
      context.logger.debug("Start of Resolver Sound.sound")
      const sound = await context.dataSources.sapienAPI.getAllSound()
      return sound.data
    },
  },
  Sound: {
    id: (obj, args, context) => {
      context.logger.silly("Start of Sound.id", { meta: obj })
      return obj.id
    },
    tag: (obj, args, context) => {
      context.logger.silly("Start of Sound.tag", { meta: obj })
      return obj.tag
    },
    description: (obj, args, context) => {
      context.logger.silly("Start of Sound.description", { meta: obj })
      return obj.description
    },
    size: (obj, args, context) => {
      context.logger.silly("Start of Sound.size", { meta: obj })
      return obj.size
    },
    created: (obj, args, context) => {
      context.logger.silly("Start of Sound.created", { meta: obj })
      return obj.created
    },
    modified: (obj, args, context) => {
      context.logger.silly("Start of Sound.modified", { meta: obj })
      return obj.modified
    },
  },
}

export default resolvers
