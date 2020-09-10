import React, { FunctionComponent } from "react"
import Tabs from "@material-ui/core/Tabs"
import shortid from "shortid"
import Tab from "@material-ui/core/Tab"
import { tabStyles } from "./TabbedMUIStyles"
import { tabsStyles } from "../../../styles/commonMUIStyles"
import styles from "./TabbedTable.module.scss"

interface TabbedTableProps {
  TabsMenu: Record<string, React.ReactNode>
}

export const TabbedTable: FunctionComponent<TabbedTableProps> = React.memo(
  ({ TabsMenu }) => {
    const tabClasses = tabStyles()
    const tabsClasses = tabsStyles()
    const TabKeys = Object.keys(TabsMenu)

    const [currentTab, setCurrentTab] = React.useState(0)
    const [currentComp, setCurrentComp] = React.useState(TabsMenu[TabKeys[0]])

    const handleTabChange = (
      event: React.ChangeEvent<{}>,
      newTabKeyIndex: number,
    ) => {
      setCurrentTab(newTabKeyIndex)
      setCurrentComp(TabsMenu[TabKeys[newTabKeyIndex]])
    }
    return (
      <>
        <div className={styles.toolBar}>
          <p className={styles.headerBarTitle}>Brightec Demo</p>
          <Tabs
            value={currentTab}
            className={styles.tabsMenu}
            onChange={handleTabChange}
            classes={{
              indicator: tabsClasses.indicator,
              flexContainer: tabsClasses.flexContainer,
            }}>
            {TabKeys.map(lTab => (
              <Tab
                label={lTab}
                className={styles.tab}
                classes={{
                  selected: tabClasses.selected,
                }}
                key={shortid.generate()}
              />
            ))}
          </Tabs>
        </div>
        {currentComp}
      </>
    )
  },
)
