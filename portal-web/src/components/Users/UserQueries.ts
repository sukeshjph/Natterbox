import gql from "graphql-tag"

export const GET_ALL_USERS_PAGINATED = gql`
  query usersPaginated($index: Int, $length: Int) {
    usersPaginated(index: $index, length: $length) {
      hasMore
      firstIndex
      lastIndex
      prevIndex
      nextIndex
      count
      users {
        userName
        userId
        firstName
        lastName
        sipExtension
      }
    }
  }
`

export const GET_ALL_USERS = gql`
  {
    users {
      userName
      userId
      firstName
      lastName
      sipExtension
    }
  }
`

export const UPDATE_DEVICE = gql`
  mutation UpdateDevice($id: ID, $device: updateDevice!) {
    updateDevice(id: $id, device: $device) {
      sipExtension
      description
      location
      enabled
      password
    }
  }
`

export const GET_VOICEMAIL = gql`
  query GetVoicemail($id: ID!) {
    voicemail(id: $id) {
      emailNotification
      emailTo
      emailAttachFile
      emailKeepFile
      ccMailboxes {
        users
      }
    }
  }
`

export const UPDATE_VOICEMAIL = gql`
  mutation UpdateVoicemail($id: ID, $voicemail: inputVoicemail) {
    updateVoicemail(id: $id, voicemail: $voicemail) {
      emailNotification
      emailTo
      emailAttachFile
      emailKeepFile
      ccMailboxes {
        users
      }
    }
  }
`

export const GET_USER_DETAILS = gql`
  query GetUserById($userId: ID!) {
    user(id: $userId) {
      userId
      userName
      firstName
      middleNames
      lastName
      sipExtension
      permissionLevel
      primaryMobileNumber
      enabled
      sipDevices
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($id: String, $user: UpdateUser!) {
    updateUser(id: $id, user: $user) {
      userName
      firstName
      middleNames
      lastName
      sipExtension
      primaryMobileNumber
      permissionLevel
      enabled
      sipDevices
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($user: CreateUser!) {
    createUser(user: $user) {
      userName
      firstName
      middleNames
      lastName
      sipExtension
      primaryMobileNumber
      permissionLevel
      enabled
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($userId: Int!) {
    deleteUser(id: $userId) {
      id
    }
  }
`

export const GET_LOCALE_SETTINGS = gql`
  query UserSettings($id: ID!) {
    userSettings(id: $id) {
      settings {
        internalCallerIdNumber
        externalCallerIdNumber
        internalCallerIdName
        presentCallerId
        voice
        countryCode
        timezone
      }
    }
  }
`

export const GET_ALL_NUMBERS = gql`
  query numbers {
    numbers {
      number
      countryCode
      areaCode
      label
      userId
      policyId
    }
  }
`

export const GET_DEVICES = gql`
  query Devices {
    devices {
      id
      sipExtension
    }
  }
`
