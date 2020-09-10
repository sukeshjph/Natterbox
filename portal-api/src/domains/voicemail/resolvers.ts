const resolvers = {
  Query: {
    voicemail: async (root, { id }, context) => {
      context.logger.debug("Start of Resolver Voicemail.voicemail")
      const result = await context.dataSources.sapienAPI.getVoicemail(id)

      return result.data
    },
  },
  Mutation: {
    updateVoicemail: async (root, { id, voicemail }, context) => {
      context.logger.debug("Start of Resolver Voicemail.updateVoicemail")
      await context.dataSources.sapienAPI.patchVoicemail(id, voicemail)

      const result = await context.dataSources.sapienAPI.getVoicemail(id)

      return result.data
    },
  },
  ccMailboxes: {
    users: (obj, args, context) => {
      context.logger.silly("Start of ccMailboxes.users", {
        meta: obj,
      })
      if (obj.users) return obj.users
      return []
    },
  },
  Voicemail: {
    emailNotification: (obj, args, context) => {
      context.logger.silly("Start of Voicemail.emailNotification", {
        meta: obj,
      })
      return obj.emailNotification
    },
    emailTo: (obj, args, context) => {
      context.logger.silly("Start of Voicemail.emailTo", { meta: obj })
      return obj.emailTo
    },
    emailAttachFile: (obj, args, context) => {
      context.logger.silly("Start of Voicemail.emailAttachFile", { meta: obj })
      return obj.emailAttachFile
    },
    emailKeepFile: (obj, args, context) => {
      context.logger.silly("Start of Voicemail.emailKeepFile", { meta: obj })
      return obj.emailKeepFile
    },
    ccMailboxes: (obj, args, context) => {
      context.logger.silly("Start of Voicemail.ccMailboxes", { meta: obj })
      if (obj.ccMailboxes) return obj.ccMailboxes
      return {}
    },
  },
}

export default resolvers
