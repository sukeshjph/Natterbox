import gql from "graphql-tag"

export const GET_GROUP_MEMBERS = gql`
  query GroupMembersPaginated($id: ID, $index: Int, $length: Int) {
    groupMembersPaginated(id: $id, index: $index, length: $length) {
      nextIndex
      hasMore
      lastIndex
      count
      users {
        userId
        userName
        firstName
        lastName
        sipExtension
        primaryGroupId
        loggedIn
      }
    }
  }
`

export const UPDATE_USERS = gql`
  mutation updateGroupUsers($id: ID, $users: JSON) {
    updateGroupUsers(id: $id, users: $users) {
      id
      sipExtension
      name
      system
      category
      emailAddress
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
      memberOf
    }
  }
`
