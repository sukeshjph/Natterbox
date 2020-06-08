import React from "react"

const SecuritySettingsUpdate: React.FC<{ id: String }> = ({ id }) => {
  const options = { variables: { id } }

  return (
    <>
      <div>Security Settings</div>
      <div>{options}</div>
    </>
  )
}

export default SecuritySettingsUpdate
