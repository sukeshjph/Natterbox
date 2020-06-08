import { gql } from "apollo-boost"

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
