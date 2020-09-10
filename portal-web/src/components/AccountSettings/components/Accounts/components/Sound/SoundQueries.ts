import gql from "graphql-tag"

export const GET_ALL_SOUND = gql`
  query soundPaginated($index: Int, $length: Int) {
    soundPaginated(index: $index, length: $length) {
      hasMore
      firstIndex
      lastIndex
      prevIndex
      nextIndex
      count
      sound {
        id
        tag
        description
        size
        created
        modified
      }
    }
  }
`
