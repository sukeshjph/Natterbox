import { RESTDataSource } from "apollo-datasource-rest"

// Our libs
import callLogsStub from "@domains/callLogs/stub"
import userStub, {
  getUserStub,
  createUserStub,
  updateUserStub,
  deleteUserStub,
} from "@domains/users/stub"
import { getPolicyByIdStub, getPoliciesStub } from "@domains/policies/stub"
import recordingStub from "@domains/recordings/stub"
import {
  devicesStub,
  deviceStub,
  createDeviceStub,
  updateDeviceStub,
  deleteDeviceStub,
} from "@domains/devices/stub"
import { soundStub } from "@domains/sound/stub"
import { numbersStub } from "@domains/numbers/stub"
import {
  generalSettingsStub,
  generalSettingsUpdateStub,
  generalSettingsDeleteStub,
} from "@domains/generalSettings/stub"
import {
  groupsStub,
  groupStub,
  groupMembersLoggedIn,
} from "@domains/groups/stub"
import { getVoicemailStub } from "@domains/voicemail/stub"

import {
  postEndpoint,
  getEndpoint,
  patchEndpoint,
  deleteEndpoint,
  putEndpoint,
} from "@/utils/callEndpoint"

class SapienAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.SAPIEN_URL
  }

  // SET AUTH HEADER
  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`)
    this.context.logger.debug("sapienAPI.willSendRequest", { meta: request })
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

  // GET CALL SOUND
  async getAllSound() {
    return getEndpoint(
      this,
      soundStub,
      `${this.getCommonUrl(this.context)}/sound`,
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

  async getGroupLoggedIn(groupId) {
    return getEndpoint(
      this,
      groupMembersLoggedIn,
      `${this.getCommonUrl(this.context)}/user-group/${groupId}/user-login`,
    )
  }

  async updateGroupLoggedIn(groupId, loggedIn) {
    return patchEndpoint(
      this,
      groupMembersLoggedIn,
      `${this.getCommonUrl(this.context)}/user-group/${groupId}/user-login`,
      loggedIn,
    )
  }

  // CREATE A NEW USER
  async createUser(userInput) {
    return postEndpoint(
      this,
      createUserStub,
      `${this.getCommonUrl(this.context)}/user`,
      userInput,
    )
  }

  // UPDATE AN EXISTING USER

  async updateUser(id, user) {
    return patchEndpoint(
      this,
      updateUserStub,
      `${this.getCommonUrl(this.context)}/user/${id}`,
      user,
    )
  }

  // DELETE User
  async deleteUser(id) {
    return deleteEndpoint(
      this,
      deleteUserStub,
      `${this.getCommonUrl(this.context)}/user/${id}`,
    )
  }

  // GET POLICY BY ID
  async getPolicyById(policyId) {
    const params = "?_limit=100"
    return getEndpoint(
      this,
      getPolicyByIdStub,
      `${this.getCommonUrl(this.context)}/dial-plan/policy/${policyId}`,
      params,
    )
  }

  async postPolicy(policy) {
    return postEndpoint(
      this,
      getPoliciesStub,
      `${this.getCommonUrl(
        this.context,
      )}/dial-plan/policy`,
      policy,
    )
  }

  async putPolicy(id, policy) {
    return putEndpoint(
      this,
      getPoliciesStub,
      `${this.getCommonUrl(this.context)}/dial-plan/policy/${id}`,
      policy,
    )
  }

  // GET POLICIES
  async getPolicies() {
    return getEndpoint(
      this,
      getPoliciesStub,
      `${this.getCommonUrl(this.context)}/dial-plan/policy`,
    )
  }

  // GET POLICY
  async getPolicy() {
    return getEndpoint(
      this,
      getPoliciesStub,
      `${this.getCommonUrl(this.context)}/dial-plan/policy`,
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
  async getLocaleSettings() {
    return getEndpoint(
      this,
      generalSettingsStub,
      `${this.getCommonUrl(this.context)}/setting/general`,
    )
  }

  // Update general settings
  async updateLocale(settings) {
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
  async deleteLocale(deleteSettings) {
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

  // UPDATE GROUPS
  async updateGroup(id, group) {
    return patchEndpoint(
      this,
      groupStub,
      `${this.getCommonUrl(this.context)}/user-group/${id}`,
      group,
    )
  }

  // CREATE GROUP
  async createGroup(group) {
    return postEndpoint(
      this,
      groupStub,
      `${this.getCommonUrl(this.context)}/user-group`,
      group,
    )
  }

  // GET GROUPS
  async getGroups() {
    return getEndpoint(
      this,
      groupsStub,
      `${this.getCommonUrl(this.context)}/user-group`,
    )
  }

  // GET GROUP
  async getGroup(id) {
    return getEndpoint(
      this,
      groupStub,
      `${this.getCommonUrl(this.context)}/user-group/${id}`,
    )
  }

  // GET GROUP
  async getTemplates() {
    return getEndpoint(
      this,
      groupStub,
      `${this.getCommonUrl(this.context)}/dial-plan/template`,
    )
  }

  // GET GROUP
  async getTemplate(id) {
    return getEndpoint(
      this,
      groupStub,
      `${this.getCommonUrl(this.context)}/dial-plan/template/${id}`,
    )
  }

  // TEST
  async getTest() {
    return getEndpoint(this, {}, `${this.baseURL}/v1/test/secure`)
  }

  // GET VOICEMAIL
  async getVoicemail(userID) {
    return getEndpoint(
      this,
      getVoicemailStub,
      `${this.getCommonUrl(this.context)}/user/${userID}/setting/voicemail`,
    )
  }

  // GET VOICEMAIL
  async patchVoicemail(userID, data) {
    return patchEndpoint(
      this,
      getVoicemailStub,
      `${this.getCommonUrl(this.context)}/user/${userID}/setting/voicemail`,
      data,
    )
  }
}

export default SapienAPI
