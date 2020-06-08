import React from "react"
import Devices from "../../components/Devices"
import { NoTabTable } from "../../components/shared"

const DevicesPage: React.FC<{}> = React.memo(() => (
  <NoTabTable>
    <Devices />
  </NoTabTable>
))

export default DevicesPage
