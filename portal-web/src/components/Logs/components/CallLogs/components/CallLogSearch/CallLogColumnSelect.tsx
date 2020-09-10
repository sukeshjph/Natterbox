import React from "react"
import { searchKeys } from "../../CallLogs.type"

type ownProps = {
  handleSelectChange: (rowKey: string, rowIndex: number) => void
  searchOptions: Partial<Record<searchKeys, string>>
  rowIndex: number
  initialValue?: string
  disabled?: boolean
}

export const CallLogColumnSelect: React.FC<ownProps> = ({
  handleSelectChange,
  searchOptions,
  rowIndex,
  initialValue,
  disabled = false,
}) => {
  const [curSelectedVal, setCurSelectedVal] = React.useState(initialValue)
  return (
    <select
      onChange={event => {
        setCurSelectedVal(event.target.value)
        handleSelectChange(event.target.value, rowIndex)
      }}
      disabled={disabled}
      value={curSelectedVal}>
      <option value="" />
      {searchOptions
        ? Object.keys(searchOptions).map(colKey => (
            <option value={colKey}>{searchOptions[colKey]}</option>
          ))
        : null}
    </select>
  )
}
