const resolvers = {
  Mutation: {
    createDevice: async (root, args, context) => {
      context.logger.debug("Start of resolver Device.createDevice")
      const result = await context.dataSources.sapienAPI.createDevice(
        args.device,
      )

      return {
        id: result.id,
        password: result.password,
        ...result.data,
      }
    },
    updateDevice: async (root, args, context) => {
      context.logger.debug("Start of resolver Device.updateDevice")
      const result = await context.dataSources.sapienAPI.updateDevice(
        args.id,
        args.device,
      )
      if (result.password)
        return {
          ...result.data,
          password: result.password,
        }

      return result.data
    },
    deleteDevice: async (root, args, context) => {
      context.logger.debug("Start of resolver Device.deleteDevice")
      const result = await context.dataSources.sapienAPI.deleteDevice(args.id)

      return result
    },
  },
  Query: {
    devices: async (root, args, context) => {
      context.logger.debug("Start of Resolver Device.devices")
      const devices = await context.dataSources.sapienAPI.getDevices()
      return devices.data
    },
    device: async (root, args, context) => {
      context.logger.debug("Start of Resolver Device.device")
      const device = await context.dataSources.sapienAPI.getDeviceById(args.id)

      return device.data
    },
  },
  Device: {
    id: (obj, args, context) => {
      context.logger.silly("Start of Device.id", { meta: obj })
      return obj.id
    },
    sipExtension: (obj, args, context) => {
      context.logger.silly("Start of Device.sipExtension", { meta: obj })
      return obj.sipExtension
    },
    description: (obj, args, context) => {
      context.logger.silly("Start of Device.description", { meta: obj })
      return obj.description
    },
    location: (obj, args, context) => {
      context.logger.silly("Start of Device.location", { meta: obj })
      return obj.location
    },
    enabled: (obj, args, context) => {
      context.logger.silly("Start of Device.enabled", { meta: obj })
      return obj.enabled
    },
    macAddress: (obj, args, context) => {
      context.logger.silly("Start of Device.macAddress", { meta: obj })
      return obj.macAddress
    },
    registered: (obj, args, context) => {
      context.logger.silly("Start of Device.registered", { meta: obj })
      return obj.registered
    },
    registrationExpiry: (obj, args, context) => {
      context.logger.silly("Start of Device.registrationExpiry", { meta: obj })
      return obj.registrationExpiry
    },
  },
}

export default resolvers
