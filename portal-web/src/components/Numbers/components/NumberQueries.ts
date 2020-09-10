import gql from "graphql-tag"

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
export const DELETE_NUMBER = gql`
  mutation DeleteNumber($countryCode: String, $number: String) {
    deleteNumber(countryCode: $countryCode, number: $number) {
      message
    }
  }
`
