import React from "react"
import Users from "../../components/Users"
import { NoTabTable } from "../../components/shared"

const UsersPage: React.FC<{}> = React.memo(() => (
  <NoTabTable>
    <Users />
  </NoTabTable>
))

export default UsersPage
