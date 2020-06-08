import { gql } from "apollo-boost"

export const GET_ALL_NUMBERS = gql`
  query numbers($index: Int, $length: Int) {
    numbersPaginated(index: $index, length: $length) {
      hasMore
      firstIndex
      lastIndex
      prevIndex
      nextIndex
      count
      numbers {
        number
        countryCode
        areaCode
        label
        userId
        policyId
      }
    }
  }
`

export const UPDATE_NUMBER = gql`
  mutation UpdateNumber($id: String, $number: updateNumber) {
    updateNumber(id: $id, number: $number) {
      userId
    }
  }
`
