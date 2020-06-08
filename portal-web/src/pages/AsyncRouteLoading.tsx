import React from "react"

const AsyncRouteLoading = ({ error, pastDelay, retry }) => {
  if (error) {
    return (
      <div>
        Error!{" "}
        <button onClick={retry} type="button">
          Retry
        </button>
      </div>
    )
  }
  if (pastDelay) {
    return <div>Loading...</div>
  }
  return null
}

export default AsyncRouteLoading
