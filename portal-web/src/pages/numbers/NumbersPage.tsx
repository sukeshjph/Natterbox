import React from "react"
import NumberList from "../../components/Numbers"
import { NoTabTable } from "../../components/shared"

const NumbersPage: React.FC<{}> = React.memo(() => (
  <NoTabTable>
    <NumberList />
  </NoTabTable>
))

export default NumbersPage
