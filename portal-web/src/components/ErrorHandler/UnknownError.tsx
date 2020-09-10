import React from "react"

export const UnknownError = ({ error }: { error: string }) => {
  return (
    <div>
      <span>Some unknown error occured:</span>
      <p>{error}</p>
    </div>
  )
}
