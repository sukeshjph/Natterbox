export interface INumber {
  label: string | null
  number: string | null
  countryCode: string | null
  userId: number | null
  policyId: string | null
}

export interface INumberWithPagers {
  hasMore: boolean
  firstIndex: number
  lastIndex: number
  prevIndex: number
  nextIndex: number
  count: number
  numbers: INumber[]
}
