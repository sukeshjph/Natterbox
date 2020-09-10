const resolvers = {
  Query: {
    localeSettings: async (root, args, context) => {
      context.logger.debug("Start of Resolver GeneralSettings.localeSettings")
      const locale = await context.dataSources.sapienAPI.getLocaleSettings()

      return locale.data
    },
    generalSettings: async (root, args, context) => {
      context.logger.debug("Start of Resolver GeneralSettings.generalSettings")
      const coreSettings = await context.dataSources.coreAPI.getOrgSimple()

      return coreSettings
    },
  },
  Mutation: {
    updateGeneralSettings: async (roots, args, context) => {
      await context.dataSources.coreAPI.updateGeneralSettings(
        args.id,
        args.settings,
      )

      const result = await context.dataSources.coreAPI.getOrgSimple()

      return result
    },
    updateLocaleSettings: async (root, args, context) => {
      context.logger.debug(
        "Start of resolver GeneralSettings.updateLocaleSettings",
      )
      const result = await context.dataSources.sapienAPI.updateLocale(
        args.settings,
      )

      if (result.status === 204) {
        const updatedSettings = await context.dataSources.sapienAPI.getLocaleSettings()
        return {
          ...(updatedSettings && updatedSettings.data
            ? updatedSettings.data
            : {}),
          message: result.message,
        }
      }

      return result.data
    },
    deleteLocaleSettings: async (root, args, context) => {
      const {
        deleteInput: { settingsCategory, settings },
      } = args

      context.logger.debug(
        "Start of resolver GeneralSettings.deleteLocaleSettings",
      )

      let deleteResponses = []

      const promises = settings.map(async settingName => {
        const response = await context.dataSources.sapienAPI.deleteLocale({
          settingsCategory,
          settingName,
        })
        deleteResponses = [...deleteResponses, response.message || ""]
      })

      await Promise.all(promises) // Wait for all deletes to go through

      const newSettings = await context.dataSources.sapienAPI.getLocaleSettings()

      return {
        ...(newSettings && newSettings.data ? newSettings.data : {}),
        message: deleteResponses.filter(val => val).join(","),
      }
    },
  },
  GeneralSettings: {
    orgId: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.orgId", { meta: obj })
      return obj.OrgID
    },
    name: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.name", { meta: obj })
      return obj.Name
    },
    alias: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.alias", { meta: obj })
      return obj.Alias
    },
    maxUsers: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.maxUsers", { meta: obj })
      return obj.MaxUsers
    },
    maxDevices: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.maxDevices", { meta: obj })
      return obj.MaxDevices
    },
    maxConnectors: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.maxConnectors", {
        meta: obj,
      })
      return obj.MaxConnectors
    },
    maxSIPTrunkLicenses: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.maxSIPTrunkLicenses", {
        meta: obj,
      })
      return obj.MaxSIPTrunkLicenses
    },
    directNotifications: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.directNotifications", {
        meta: obj,
      })
      return obj.DirectNotifications
    },
    logCompliance: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.logCompliance", {
        meta: obj,
      })
      return obj.LogCompliance
    },
    twoFactorAuth: (obj, args, context) => {
      context.logger.silly("Start of GeneralSettings.twoFactorAuth", {
        meta: obj,
      })
      return obj.TwoFactorAuth
    },
  },
}

export default resolvers
