import React from "react"
import styles from "./TabbedTable.module.scss"

// TODO: Add global breadcrumb component instead of hardcoded title
export const NoTabTable: React.FC<{
  children?: React.ReactElement
}> = React.memo(({ children }) => (
  <div className={styles.toolBarVertical}>
    <p className={styles.headerText}>Brightec Demo</p>
    {children}
  </div>
))
