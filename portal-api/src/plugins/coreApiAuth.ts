import axios from "axios"

export default class CoreApiAuth {
  gatekeeperBaseUrl

  lassoBaseUrl

  constructor() {
    this.gatekeeperBaseUrl =
      "https://gatekeeper.redmatter-qa01.pub/token/sapien/organisation"
    this.lassoBaseUrl = "http://lasso.qa01.redmatter.com/auth/token/coreapi"
  }

  async getLassoToken(orgId, userId, token, logger) {
    const gatekeeperToken: any = await this.getGatekeeperApiToken(
      orgId,
      userId,
      token,
      logger,
    )

    const result = await axios
      .get(this.lassoBaseUrl, {
        headers: {
          Authorization: `Bearer ${gatekeeperToken.data.jwt}`,
        },
      })
      .catch(() => {
        logger.error("Problem getting Lasso Token")
        // throw new Error("Problem getting Lasso Token. Might be routes or vpn")
      })

    return result.data.access_token
  }

  async getGatekeeperApiToken(orgId, userId, token, logger) {
    const result = await axios
      .get(
        `${this.gatekeeperBaseUrl}/${orgId}/user/${userId}?scope=portal:admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .catch(() => {
        logger.error("Problem getting Lasso Token")
        // throw new Error("Problem getting Gatekeeper Token, might be expired JWT")
      })

    return result
  }
}
