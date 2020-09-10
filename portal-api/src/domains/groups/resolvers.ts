import { isNil } from "ramda"

const { getPaginatedResults } = require("@/utils/tools")

const resolvers = {
  Mutation: {
    updateGroup: async (root, args, context) => {
      context.logger.debug("Start of resolver Group.updateGroup")
      const { id, group } = args

      const result = await context.dataSources.sapienAPI.updateGroup(id, group)

      return result.data
    },
    createGroup: async (root, args, context) => {
      context.logger.debug("Start of resolver Group.createGroup")
      const result = await context.dataSources.sapienAPI.createGroup(args.group)
      return result.data
    },
    updateGroupUsers: async (roots, { id, users }, context) => {
      context.logger.debug("Start of resolver Group.updateGroupUsers")

      // loop through the users and make 2 requests:
      await Promise.all(
        Object.keys(users).map(async userId => {
          const user = {
            userName: users[userId].userName,
            firstName: users[userId].firstName,
            lastName: users[userId].lastName,
            sipExtension: users[userId].sipExtension,
            primaryGroupId: parseInt(users[userId].primaryGroupId, 10),
          }

          const { loggedIn } = users[userId]

          if (!isNil(loggedIn)) {
            await context.dataSources.sapienAPI.updateGroupLoggedIn(id, {
              [userId]: loggedIn,
            })
          }

          await context.dataSources.sapienAPI.updateUser(userId, user)
        }),
      )

      const result = await context.dataSources.sapienAPI.getGroup(id)

      return result.data
    },
  },
  Query: {
    groupMembersPaginated: async (root, { id, index, length }, context) => {
      context.logger.debug("Start of Resolver Group.groupMembersPaginated")
      const result = await context.dataSources.sapienAPI.getGroup(id)

      // Declare paginated results outside of if block incase we need to append devices information in there as well later
      let paginatedResults

      // Handle Users if group has them
      if (result.data.members.users) {
        // paginate results so I don't overfetch
        paginatedResults = getPaginatedResults({
          index,
          length,
          results: result.data.members.users.reverse(),
          dynamicKey: "users",
        })

        const getData = async () => {
          return Promise.all(
            paginatedResults.users.map(async userId => {
              const user = await context.dataSources.sapienAPI.getUserById(
                userId,
              )
              return {
                userId,
                ...user.data,
              }
            }),
          )
        }

        // get more information about each user
        paginatedResults.users = await getData()

        // if not a system group get which members of the group are logged in
        if (!result.data.system) {
          const groupLoggedIn = await context.dataSources.sapienAPI.getGroupLoggedIn(
            id,
          )

          // loop through my users and map in groupLoggedIn data.
          paginatedResults.users = paginatedResults.users.map(user => {
            return {
              ...user,
              loggedIn: groupLoggedIn.data[user.userId],
            }
          })
        }
      }

      //
      // if(result.data.members.devices) {
      //   // TODO CAN ALSO BE result.data.members.devices <- need to work out what to do with that
      // }

      return paginatedResults
    },
    groupsPaginated: async (root, { index, length }, context) => {
      context.logger.debug("Start of Resolver Group.groups")
      const groups = await context.dataSources.sapienAPI.getGroups()

      return getPaginatedResults({
        index,
        length,
        results: groups.data.reverse(),
        dynamicKey: "groups",
      })
    },
    group: async (root, args, context) => {
      context.logger.debug("Start of resolver Group.updateGroup")
      const result = await context.dataSources.sapienAPI.getGroup(args.id)

      return result.data
    },
    groups: async (root, args, context) => {
      context.logger.debug("Start of resolver Group.groups")
      const groups = await context.dataSources.sapienAPI.getGroups()
      return groups.data
    },
    groupLoggedIn: async (root, args, context) => {
      context.logger.debug("Start of Resolver Group.groupLoggedIn")
      const { id } = args
      const groupLoggedIn = await context.dataSources.sapienAPI.getGroupLoggedIn(
        id,
      )

      return { groupLoggedIn }
    },
  },
  Group: {
    id: (obj, args, context) => {
      context.logger.silly("Start of Group.id", { meta: obj })
      return obj.id
    },
    name: (obj, args, context) => {
      context.logger.silly("Start of Group.name", { meta: obj })
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
  Logins: {
    login: (obj, args, context) => {
      context.logger.silly("Start of Logins.login", { meta: obj })
      return obj.groupLoggedIn.data
    },
  },
}

export default resolvers
