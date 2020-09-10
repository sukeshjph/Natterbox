import gql from "graphql-tag"

export const GET_ALL_GROUPS_PAGINATED = gql`
  query groupsPaginated($index: Int, $length: Int) {
    groupsPaginated(index: $index, length: $length) {
      hasMore
      firstIndex
      lastIndex
      prevIndex
      nextIndex
      count
      groups {
        id
        sipExtension
        name
        system
        category
      }
    }
  }
`

export const GET_ALL_GROUPS = gql`
  query groups {
    groups {
      id
      sipExtension
      name
      system
      category
    }
  }
`

export const VIEW_GROUP = gql`
  query group($id: ID) {
    group(id: $id) {
      id
      sipExtension
      name
      system
      category
      emailAddress
      members {
        users
      }
    }
  }
`

export const UPDATE_GROUP = gql`
  mutation UpdateGroup($id: ID, $group: updateGroup) {
    updateGroup(id: $id, group: $group) {
      id
      sipExtension
      name
      system
      category
      emailAddress
    }
  }
`

export const CREATE_GROUP = gql`
  mutation CreateGroup($group: createGroup) {
    createGroup(group: $group) {
      sipExtension
      name
      emailAddress
    }
  }
`
