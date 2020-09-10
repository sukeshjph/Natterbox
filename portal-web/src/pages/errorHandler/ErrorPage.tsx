import React from "react"
import ErrorHandler from "../../components/ErrorHandler"
import { NoTabTable } from "../../components/shared"

const ErrorPage: React.FC<{}> = React.memo(() => (
  <NoTabTable>
    <ErrorHandler />
  </NoTabTable>
))

export default ErrorPage
