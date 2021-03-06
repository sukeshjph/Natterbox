import React from "react"
import { Accounts, Assets } from "../../components/AccountSettings"

import { TabbedTable } from "../../components/shared"

const LogTabs: Record<string, any> = {
  General: <Accounts />,
  IPLines: <Assets />,
  Phones: <Assets />,
  Sims: <Assets />,
}

const AccountSettings = React.memo(() => <TabbedTable TabsMenu={LogTabs} />)

export default AccountSettings
