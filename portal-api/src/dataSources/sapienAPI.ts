import { RESTDataSource } from "apollo-datasource-rest"

// Our libs
import callLogsStub from "@domains/callLogs/stub"
import userStub, {
  getUserStub,
  createUserStub,
  updateUserStub,
} from "@domains/users/stub"
import policyStub from "@domains/policies/stub"
import recordingStub from "@domains/recordings/stub"
import {
  devicesStub,
  deviceStub,
  createDeviceStub,
  updateDeviceStub,
  deleteDeviceStub,
} from "@domains/devices/stub"
import { numbersStub } from "@domains/numbers/stub"
import {
  generalSettingsStub,
  generalSettingsUpdateStub,
  generalSettingsDeleteStub,
} from "@domains/generalSettings/stub"
import { groupsStub } from "@domains/groups/stub"

import {
  postEndpoint,
  getEndpoint,
  patchEndpoint,
  deleteEndpoint,
} from "@/utils/callEndpoint"

class SapienAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.SAPIEN_URL
  }

  // SET AUTH HEADER
  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`)
    this.context.logger.silly("sapienAPI.willSendRequest", { meta: request })
  }

  getCommonUrl(context) {
    return `/v1/organisation/${context.authContext.orgID}`
  }

  // GET CALL LOGS
  async getCallLogs() {
    return getEndpoint(
      this,
      callLogsStub,
      `${this.getCommonUrl(this.context)}/log/call`,
    )
  }

  // GET ALL USERS
  async getAllUsers() {
    return getEndpoint(
      this,
      userStub,
      `${this.getCommonUrl(this.context)}/user`,
    )
  }

  // GET USER BY ID
  async getUserById(userId) {
    return getEndpoint(
      this,
      getUserStub,
      `${this.getCommonUrl(this.context)}/user/${userId}`,
    )
  }

  // CREATE A NEW USER
  async createUser(user) {
    return postEndpoint(
      this,
      createUserStub,
      `${this.getCommonUrl(this.context)}/user`,
      user,
    )
  }

  // UPDATE AN EXISTING USER

  async updateUser(user) {
    return patchEndpoint(
      this,
      updateUserStub,
      `${this.getCommonUrl(this.context)}/user/${user.id}`,
      user,
    )
  }

  // GET POLICY BY ID
  async getPolicyById(policyId) {
    const params = "?_limit=100"
    return getEndpoint(
      this,
      policyStub,
      `${this.getCommonUrl(this.context)}/dial-plan/policy/${policyId}`,
      params,
    )
  }

  // GET RECORDING
  async getRecordingById(uUid) {
    return getEndpoint(
      this,
      recordingStub,
      `${this.getCommonUrl(this.context)}/archive/recording/${uUid}`,
    )
  }

  // GET DEVICES
  async getDevices() {
    return getEndpoint(
      this,
      devicesStub,
      `${this.getCommonUrl(this.context)}/sip-device`,
    )
  }

  // GET DEVICE BY ID
  async getDeviceById(id) {
    return getEndpoint(
      this,
      deviceStub,
      `${this.getCommonUrl(this.context)}/sip-device/${id}`,
    )
  }

  async createDevice(device) {
    return postEndpoint(
      this,
      createDeviceStub,
      `${this.getCommonUrl(this.context)}/sip-device`,
      device,
    )
  }

  // UPDATE DEVICE
  async updateDevice(id, device) {
    return patchEndpoint(
      this,
      updateDeviceStub,
      `${this.getCommonUrl(this.context)}/sip-device/${id}`,
      device,
    )
  }

  // DELETE DEVICE
  async deleteDevice(id) {
    return deleteEndpoint(
      this,
      deleteDeviceStub,
      `${this.getCommonUrl(this.context)}/sip-device/${id}`,
    )
  }

  async getNumbers() {
    return getEndpoint(
      this,
      numbersStub,
      `${this.getCommonUrl(this.context)}/number/landline`,
    )
  }

  async updateNumber(id, number) {
    return patchEndpoint(
      this,
      numbersStub,
      `${this.getCommonUrl(this.context)}/number/landline/${id}`,
      number,
    )
  }

  // GET General settings
  async getGeneralSettings() {
    return getEndpoint(
      this,
      generalSettingsStub,
      `${this.getCommonUrl(this.context)}/setting/general`,
    )
  }

  // Update general settings
  async updateGeneralSettings(settings) {
    const response = await patchEndpoint(
      this,
      generalSettingsUpdateStub,
      `${this.getCommonUrl(this.context)}/setting/general`,
      settings,
    )

    return {
      status: 204,
      message: response || "Settings updated successfully",
    }
  }

  // Delete general settings
  async deleteGeneralSettings(deleteSettings) {
    const { settingsCategory, settingName } = deleteSettings
    let response = ""

    try {
      response = await deleteEndpoint(
        this,
        generalSettingsDeleteStub,
        `${this.getCommonUrl(
          this.context,
        )}/setting/${settingsCategory}/${settingName}`,
      )

      return {
        status: 204,
        message: `${settingName} deleted successfully`,
      }
    } catch (error) {
      if (error.message === "404: Not Found")
        return {
          status: 404,
          message: `${settingName} doesn't exist`,
        }
    }

    return response
  }

  // GET GROUPS
  async getGroups() {
    return getEndpoint(
      this,
      groupsStub,
      `${this.getCommonUrl(this.context)}/user-group`,
    )
  }
}

export default SapienAPI
