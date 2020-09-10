import gql from "graphql-tag"

export const GET_ALL_DEVICES_PAGINATED = gql`
  query devicesPaginated($index: Int, $length: Int) {
    devicesPaginated(index: $index, length: $length) {
      hasMore
      firstIndex
      lastIndex
      prevIndex
      nextIndex
      count
      devices {
        id
        macAddress
        registrationExpiry
      }
    }
  }
`

export const GET_ALL_DEVICES = gql`
  {
    devices {
      id
      macAddress
      registrationExpiry
    }
  }
`

export const VIEW_DEVICE = gql`
  query device($id: ID) {
    device(id: $id) {
      id
      sipExtension
      description
      location
      enabled
      password
    }
  }
`

export const CREATE_DEVICE = gql`
  mutation CreateDevice($device: createDevice!) {
    createDevice(device: $device) {
      sipExtension
      description
      location
      enabled
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

export const DELETE_DEVICE = gql`
  mutation DeleteDevice($id: ID) {
    deleteDevice(id: $id) {
      id
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation UpdateDevice($id: ID, $device: updateDevice!) {
    updateDevice(id: $id, device: $device) {
      password
    }
  }
`
