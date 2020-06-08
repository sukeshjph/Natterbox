import { gql } from "apollo-boost"

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
