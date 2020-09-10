import { RESTDataSource } from "apollo-datasource-rest"
import xml2js from "xml2js"
import { pathOr, isEmpty } from "ramda"
import {
  getEndpoint,
  postEndpoint,
  deleteEndpoint,
  putEndpoint,
} from "@/utils/callEndpoint"
import { healthStub } from "@domains/health/stub"
import {
  defaultPoliciesStub,
  allEndpointsStub,
  allOrgPoliciesStub,
  createPolicyStub,
} from "@domains/archiving/stub"

class CoreAPI extends RESTDataSource {
  public token

  constructor() {
    super()
    this.baseURL = process.env.CORE_API_URL
  }

  // SET AUTH HEADER
  async willSendRequest(request) {
    request.headers.set("Authorization", `${this.context.lassoToken}`)
    this.context.logger.info("coreAPI.willSendRequest", {
      meta: {
        request,
        token: this.context.lassoToken,
      },
    })
  }

  async getOrgSimple() {
    const xml = await getEndpoint(
      this,
      healthStub,
      `/orgs/${this.context.authContext.orgID}/simple`,
    )

    const json = await xml2js.parseStringPromise(xml)

    return {
      ...json.Orgs.Org[0].$,
    }
  }

  async deleteNumber(countrycode, _number) {
    const number = _number.replace(new RegExp(`^${countrycode}`), "0")
    const resultXML = await deleteEndpoint(
      this,
      healthStub,
      `/numbers/${countrycode}/${number}`,
    )

    const json = await xml2js.parseStringPromise(resultXML)
    const code = json.Success.Code[0]
    const message = json.Success.Message[0]
    const requestId = json.Success.RequestID[0]
    if (code === "DeleteFailed") throw new Error(message)
    return {
      code,
      message,
      requestId,
    }
  }

  async getDefaultPolicies() {
    const xml = await getEndpoint(
      this,
      defaultPoliciesStub,
      `/archiving/defaultpolicy/${this.context.authContext.orgID}`,
    )

    const json = await xml2js.parseStringPromise(xml)
    const defaultPolicies = pathOr([], ["Archiving", "DefaultPolicies"], json)

    if (!isEmpty(defaultPolicies)) {
      if (defaultPolicies[0].DefaultPolicy) {
        return defaultPolicies[0].DefaultPolicy.map(obj => obj.$)
      }
    }

    return defaultPolicies
  }

  async getAllOrgPolicies() {
    const xml = await getEndpoint(
      this,
      allOrgPoliciesStub,
      `/archiving/policy/${this.context.authContext.orgID}/all`,
    )

    const json = await xml2js.parseStringPromise(xml)
    const allOrgPolicies = pathOr([], ["Archiving", "Policies"], json)

    if (!isEmpty(allOrgPolicies)) {
      if (allOrgPolicies[0].Policy) {
        return allOrgPolicies[0].Policy.map(policyObject =>
          Object.keys(policyObject).reduce((acc, curKey) => {
            if (curKey !== "$") {
              return {
                ...acc,
                [curKey]: policyObject[curKey][0]._,
              }
            }
            return acc
          }, {}),
        )
      }
    }

    return allOrgPolicies
  }

  async createOrgPolicy(policyInput) {
    const inputPolicyFormatted = this.getFormattedPolicy(policyInput)

    const xml = await putEndpoint(
      this,
      createPolicyStub,
      `/archiving/policy/${this.context.authContext.orgID}`,
      inputPolicyFormatted,
    )

    const json = await xml2js.parseStringPromise(xml)

    return json
  }

  async getAllEndpoints() {
    const xml = await getEndpoint(
      this,
      allEndpointsStub,
      `/archiving/endpoint/${this.context.authContext.orgID}/all`,
    )

    const json = await xml2js.parseStringPromise(xml)
    const allEndpoints = pathOr([], ["Archiving", "Endpoints"], json)

    if (!isEmpty(allEndpoints)) {
      if (allEndpoints[0].Endpoint) {
        return allEndpoints[0].Endpoint.map(endpointObject =>
          Object.keys(endpointObject).reduce((acc, curKey) => {
            if (curKey !== "$") {
              return {
                ...acc,
                [curKey]: endpointObject[curKey][0]._,
              }
            }
            return acc
          }, {}),
        )
      }
    }

    return allEndpoints
  }

  async updateGeneralSettings(id, settings) {
    const settingsFormatted = this.buildXMLAttributes("Org", settings)
    const builder = new xml2js.Builder()
    const xml = builder.buildObject(settingsFormatted)

    const resultXML = await postEndpoint(
      this,
      healthStub,
      `/orgs/${this.context.authContext.orgID}`,
      xml,
    )

    const json = await xml2js.parseStringPromise(resultXML)
    if (json.Success.Code[0] !== "OrgUpdateSuccessful")
      throw new Error("Update was unsuccessful")

    return true
  }

  async getUsersMe() {
    const xml = await getEndpoint(this, healthStub, `/users/me`)

    const json = await xml2js.parseStringPromise(xml)

    if (json.Users.User[0].$) return true
    return false
  }

  processXmlValue(value: any) {
    if (typeof value === "object") {
      if (value.childKey) {
        return {
          [value.childKey]: value.Value.map(item => ({ $: item })),
        }
      }
    }

    return { _: value || "" }
  }

  getFormattedPolicy(policyInput: any) {
    const { Value: rootValue, ...rootAttributes } = policyInput

    const builder = new xml2js.Builder()
    const obj = builder.buildObject({
      Archiving: {
        Policy: {
          $: {
            ...rootAttributes,
          },
          ...Object.keys(rootValue).reduce((acc, curKey) => {
            const { Value, ...attributes } = rootValue[curKey]
            return {
              ...acc,
              [curKey]: {
                $: {
                  ...attributes,
                },
                ...this.processXmlValue(Value),
              },
            }
          }, {}),
        },
      },
    })

    return obj
  }

  buildXMLAttributes(name: string, json: string) {
    let key
    const keys = Object.keys(json)
    let n = keys.length
    const newobj = {}
    while (n--) {
      key = keys[n]
      newobj[key[0].toUpperCase() + key.substring(1)] = json[key]
    }

    return {
      [name]: {
        $: {
          ...newobj,
        },
      },
    }
  }
}

export default CoreAPI
