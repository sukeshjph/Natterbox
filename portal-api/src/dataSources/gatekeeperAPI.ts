import {RESTDataSource} from "apollo-datasource-rest"
import {getEndpoint} from "@/utils/callEndpoint"
import {healthStub} from "@domains/health/stub"

class GatekeeperAPI extends RESTDataSource {
  public token

  constructor() {
    super()
    this.baseURL = "https://gatekeeper.redmatter-qa01.pub/token/sapien/organisation"
  }

  // SET AUTH HEADER
  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`)
    this.context.logger.debug("gatekeeperAPI.willSendRequest", {meta: request})
  }

  async getJWT() {
    return getEndpoint(
      this,
      healthStub,
      `${this.context.authContext.orgID}/user/${this.context.authContext.userID}?scope=portal:admin`
    )
  }
}

export default GatekeeperAPI