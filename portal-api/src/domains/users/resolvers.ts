const { getPaginatedResults } = require("@/utils/tools")

const resolvers = {
  Query: {
    usersPaginated: async (root, { index, length }, context) => {
      context.logger.debug("Start of Resolver Users.users")
      const users = await context.dataSources.sapienAPI.getAllUsers()

      return getPaginatedResults({
        index,
        length,
        results: users.data.reverse(),
        dynamicKey: "users",
      })
    },
    users: async (root, args, context) => {
      context.logger.debug("Start of Resolver Users.users")
      const users = await context.dataSources.sapienAPI.getAllUsers()
      return users.data
    },
    user: async (root, args, context) => {
      context.logger.debug("Start of Resolver User.user")
      const { id } = args
      const user = await context.dataSources.sapienAPI.getUserById(id)

      return { id, ...user.data }
    },
  },
  Mutation: {
    createUser: async (root, args, context) => {
      context.logger.debug("Start of resolver User.createUser")

      const result = await context.dataSources.sapienAPI.createUser({
        ...args.user,
      })

      if (result) {
        const { id, password, data } = result
        return {
          id,
          password,
          ...data,
        }
      }

      return {}
    },
    updateUser: async (root, args, context) => {
      context.logger.debug("Start of resolver User.updateUser")

      const { id, user } = args
      const result = await context.dataSources.sapienAPI.updateUser(id, user)

      const { resultId, data } = result
      return {
        id: resultId,
        ...data,
      }
    },
    deleteUser: async (root, args, context) => {
      context.logger.debug("Start of resolver User.deleteUser")
      let result
      try {
        result = await context.dataSources.sapienAPI.deleteUser(args.id)
      } catch (error) {
        throw new Error("User can't be deleted")
      }

      return result
    },
  },
  User: {
    userId: (obj, args, context) => {
      context.logger.debug("Start of User.userId", { meta: obj })
      if (obj.id) return obj.id
      return obj.userId
    },
    id: (obj, args, context) => {
      context.logger.debug("Start of User.id", { meta: obj })
      if (obj.id) return obj.id
      return obj.userId
    },
    firstName: (obj, args, context) => {
      context.logger.debug("Start of User.firstName", { meta: obj })
      return obj.firstName
    },
    lastName: (obj, args, context) => {
      context.logger.debug("Start of User.lastName", { meta: obj })
      return obj.lastName
    },
    userName: (obj, args, context) => {
      context.logger.debug("Start of User.userName", { meta: obj })
      return obj.userName
    },
  },
}

export default resolvers
