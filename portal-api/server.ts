import { ApolloServer } from "apollo-server-lambda"
import { makeExecutableSchema } from "graphql-tools"
import logger from "@plugins/winston"
import cacheManager from "cache-manager"

// our libs
import lifecycleInterceptor from "@plugins/lifecycleInterceptor"
import typeDefs from "@/schema"
import resolvers from "@/resolvers"
import SapienAPI from "@dataSources/sapienAPI"
import CoreAPI from "@dataSources/coreAPI"
import CoreApiAuth from "@plugins/coreApiAuth"
import Cache from "@plugins/cache"

// config libs
const memoryCache = cacheManager.caching({
  store: "memory",
  max: 100,
  ttl: 3000 /* seconds */,
})
const cache = new Cache(memoryCache)
const coreApiAuth = new CoreApiAuth()

const playground =
  process.env.PLAYGROUND === "true"
    ? {
        endpoint: "/graphql",
      }
    : false

const server = new ApolloServer({
  uploads: false,
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  dataSources: () => ({
    sapienAPI: new SapienAPI(),
    coreAPI: new CoreAPI(),
  }),
  context: async ({ event, context }) => {
    // get the user token from the headers
    let token = event.headers.Authorization || ""
    token = token.replace("Bearer ", "")

    if (!event.requestContext || !event.requestContext.authorizer) {
      logger.error("No requestContext or No requestContext.authorizer")
      throw new Error("Internal server error")
    }
    const authContext = event.requestContext.authorizer
    if (
      !authContext.orgID ||
      !authContext.userID ||
      !authContext.userName ||
      !authContext.scopes
    ) {
      logger.error("Missing authContext Attribute")
      throw new Error("Internal server error")
    }

    const childLogger = logger.child({
      requestId: event.requestContext.requestId,
      orgID: authContext.orgID,
      userID: authContext.userID,
    })

    const oldCacheKeys = await cache.memoryCache.keys()

    // whats in our cache?
    logger.info("Cache Keys", {
      meta: {
        cacheKeys: oldCacheKeys,
        token,
      },
    })

    // Try and get a cached Lasso Token
    let lassoToken
    const cachedValue = await cache.get(token)

    // if one not available then get it and stash it
    if (!cachedValue) {
      logger.info("No cached token")
      try {
        lassoToken = await coreApiAuth.getLassoToken(
          authContext.orgID,
          authContext.userID,
          token,
          childLogger,
        )

        logger.info("Got token from lasso", {
          meta: {
            token,
            lassoToken,
          },
        })

        await cache.set(token, lassoToken)
        const updatedCacheKeys = await cache.memoryCache.keys()

        // whats in our cache?
        logger.info("Cache Keys after caching", {
          meta: {
            cacheKeys: updatedCacheKeys,
            token,
          },
        })
      } catch (error) {
        logger.error("Couldn't get Lasso Token")
      }

      if (!lassoToken) {
        logger.error("Couldn't get Lasso Token")
        // throw new Error("Internal server error")
      }
    } else {
      lassoToken = cachedValue
    }

    logger.info("Token is cached", {
      meta: cachedValue,
    })

    return {
      lassoToken,
      authContext,
      token,
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      logger: childLogger,
    }
  },
  plugins: [lifecycleInterceptor],
  tracing: process.env.TRACING === "true",
  introspection: process.env.INTROSPECTION === "true",
  playground,
  debug: process.env.DEBUG === "true",
})

logger.info("After Apollo server instantiation in server.js")

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: process.env.CORS_ALLOWED_ORIGIN
      ? process.env.CORS_ALLOWED_ORIGIN
      : "*",
  },
})

logger.info("End of server.js")
