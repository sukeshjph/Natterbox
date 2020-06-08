import { ApolloServer } from "apollo-server-lambda"
import { makeExecutableSchema } from "graphql-tools"
import logger from "@plugins/winston"
import lifecycleInterceptor from "@plugins/lifecycleInterceptor"
import typeDefs from "@/schema"
import resolvers from "@/resolvers"
import SapienAPI from "@dataSources/sapienAPI"

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
  }),
  context: ({ event, context }) => {
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

    return {
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
