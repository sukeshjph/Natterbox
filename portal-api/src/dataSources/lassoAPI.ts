import {RESTDataSource} from "apollo-datasource-rest"
import {getEndpoint} from "@/utils/callEndpoint"
import {lassoStub} from "@domains/health/stub"

class LassoAPI extends RESTDataSource {
  public token

  constructor() {
    super()
    this.baseURL = "http://lasso.qa01.redmatter.com/auth/token/coreapi"
  }

  // SET AUTH HEADER
  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.JWT.jwt}`)
    this.context.logger.debug("sapienAPI.willSendRequest", {meta: request})
  }

  async getToken() {
    return getEndpoint(
      this,
      lassoStub,
      ``
    )
  }
}

export default LassoAPI