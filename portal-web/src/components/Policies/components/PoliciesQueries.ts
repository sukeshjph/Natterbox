import gql from "graphql-tag"

export const GET_ALL_POLICIES = gql`
  query policies(
    $index: Int
    $length: Int
    $searchInput: PolicySearchInput
    $type: String
  ) {
    policiesPaginated(
      index: $index
      length: $length
      searchInput: $searchInput
      type: $type
    ) {
      hasMore
      firstIndex
      lastIndex
      prevIndex
      nextIndex
      count
      policies {
        id
        name
        type
        enabled
        created
        modified
      }
    }
  }
`

export const GET_POLICY_BY_ID = gql`
  query getPolicyById($id: ID) {
    policy(id: $id) {
      name
      enabled
      type
      items {
        id
        name
        templateId
        subItems
        variables
      }
    }
  }
`

export const GET_TEMPLATE_BY_ID = gql`
  query getTemplateById($id: ID) {
    template(id: $id) {
      name
      variables {
        type
        additionalProperties
        properties
      }
    }
  }
`

export const CREATE_POLICY = gql`
  mutation CreatePolicy($policy: policyInput) {
    createPolicy(policy: $policy) {
      id
      name
      type
      enabled
      created
      modified
    }
  }
`
