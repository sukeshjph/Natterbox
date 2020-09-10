import React from "react"

export const NetworkError = ({ error }: { error: string }) => {
  return (
    <div>
      <span>Network error occured:</span>
      <p>{error}</p>
    </div>
  )
}
