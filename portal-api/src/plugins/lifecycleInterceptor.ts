export default {
  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    // Do not log introspection as it creates clutter
    if (requestContext.request.operationName !== "IntrospectionQuery") {
      requestContext.context.logger.debug(`Request started`, {
        meta: `${requestContext.request.query}`,
      })
    }

    return {
      willSendResponse({ response }) {
        if (response.errors)
          requestContext.context.logger.error("Error", {
            meta: response.errors,
          })
      },
    }
  },
}
