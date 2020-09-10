import gql from "graphql-tag"

export const GET_CALL_LOGS_PAGINATED = gql`
  query callLogsPaginated(
    $index: Int
    $length: Int
    $searchInput: CallLogSearchInput
  ) {
    callLogsPaginated(
      index: $index
      length: $length
      searchInput: $searchInput
    ) {
      hasMore
      firstIndex
      lastIndex
      prevIndex
      nextIndex
      count
      callLogs {
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
  }
`

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
