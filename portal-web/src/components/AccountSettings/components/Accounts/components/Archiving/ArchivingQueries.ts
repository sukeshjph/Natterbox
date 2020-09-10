import gql from "graphql-tag"

export const GET_ALL_POLICIES = gql`
  {
    orgPolicies {
      ID
      Name
      Mode
      Version
      RetentionMin
      RetentionMax
      Description
    }
  }
`

export const GET_POLICIES_ENDPOINTS = gql`
  {
    defaultPolicies {
      Type
      PolicyID
    }

    orgPolicies {
      ID
      Name
      Mode
      Version
      RetentionMin
      RetentionMax
      Description
    }

    endpoints {
      Name
      Type
      Encrypted
      Bucket
      RetentionManaged
    }
  }
`
