export interface INumber {
  label: string | null
  number: string | null
  countryCode: string | null
  userId: number | null
  policyId: string | null
}

export interface INumberWithPagers extends IPager {
  numbers: INumber[]
}

export interface NumberState {
  columnsToShow: IColType<INumber>[]
  showAddNew: boolean
  showUpdateView: boolean
  showError: boolean
  error: string
  pageLength: number
  currentPageIndex: number
  currentNumber: null | INumber
}
