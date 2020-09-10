import React from "react"

export const CustomFieldNextId = props => {
  const { id, value } = props
  return (
    <div>
      Next ID: {value}
      <input type="hidden" id={id} name={id} value={value} />
    </div>
  )
}
