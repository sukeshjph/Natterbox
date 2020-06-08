import { gql } from "apollo-boost"

export const GET_CALL_LOGS = gql`
  query callLogs($searchInput: CallLogSearchInput) {
    callLogs(searchInput: $searchInput) {
      timeStart
      fromNumber
      fromUserId
      toNumberDialled
      connectedTo
      connectedToNumber
      timeRinging
      timeTalking
      direction
      type
      flags
      policy
      recording
    }
  }
`
