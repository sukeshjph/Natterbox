const resolvers = {
  Query: {
    generalSettings: async (root, args, context) => {
      context.logger.debug("Start of Resolver GeneralSettings.generalSettings")
      const settings = await context.dataSources.sapienAPI.getGeneralSettings()
      return settings.data
    },
  },
  Mutation: {
    updateGeneralSettings: async (root, args, context) => {
      context.logger.debug("Start of resolver GeneralSettings.updateSettings")
      const result = await context.dataSources.sapienAPI.updateGeneralSettings(
        args.settings,
      )

      if (result.status === 204) {
        const updatedSettings = await context.dataSources.sapienAPI.getGeneralSettings()
        return {
          ...(updatedSettings && updatedSettings.data
            ? updatedSettings.data
            : {}),
          message: result.message,
        }
      }

      return result.data
    },
    deleteGeneralSettings: async (root, args, context) => {
      const {
        deleteInput: { settingsCategory, settings },
      } = args

      context.logger.debug(
        "Start of resolver GeneralSettings.deleteOrgSettings",
      )

      let deleteResponses = []

      const promises = settings.map(async settingName => {
        const response = await context.dataSources.sapienAPI.deleteGeneralSettings(
          {
            settingsCategory,
            settingName,
          },
        )
        deleteResponses = [...deleteResponses, response.message || ""]
      })

      await Promise.all(promises) // Wait for all deletes to go through

      const newSettings = await context.dataSources.sapienAPI.getGeneralSettings()

      return {
        ...(newSettings && newSettings.data ? newSettings.data : {}),
        message: deleteResponses.filter(val => val).join(","),
      }
    },
  },
}

export default resolvers
