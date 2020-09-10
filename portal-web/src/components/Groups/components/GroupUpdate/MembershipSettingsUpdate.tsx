import React from "react"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import styles from "../Groups.module.scss"

import GroupMembers from "./components/Members/GroupMembers"

type ownProps = {
  id: string
  isSystemGroup: boolean
  currentMembers: string[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`memership-tabpanel-${index}`}
      aria-labelledby={`memership-tab-${index}`}
      {...other}>
      {children}
    </div>
  )
}

const MembershipSettingsUpdate: React.FC<ownProps> = ({
  id,
  isSystemGroup,
  currentMembers,
}) => {
  const [curTabValue, setCurTabValue] = React.useState(0)

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurTabValue(newValue)
  }

  const compToLoad = [
    <GroupMembers
      id={id}
      isSystemGroup={isSystemGroup}
      currentMembers={currentMembers}
    />,
    <div>Devices</div>,
    <div>Groups</div>,
  ][curTabValue]

  return (
    <div className={styles.membershipGroupPanel}>
      <Tabs
        value={curTabValue}
        onChange={handleTabChange}
        aria-label="Membership Update"
        variant="fullWidth">
        <Tab label="Users" />
        <Tab label="Devices" />
        <Tab label="Groups" />
      </Tabs>
      <TabPanel value={curTabValue} index={0}>
        {compToLoad}
      </TabPanel>
    </div>
  )
}

export default MembershipSettingsUpdate
