import React from "react"
import Groups from "../../components/Groups"
import { NoTabTable } from "../../components/shared"

const GroupsPage: React.FC<{}> = React.memo(() => (
  <NoTabTable>
    <Groups />
  </NoTabTable>
))

export default GroupsPage
