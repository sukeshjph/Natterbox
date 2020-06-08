import React from "react"
import styles from "./TabbedTable.module.scss"

export const NoTabTable: React.FC<{
  children?: React.ReactElement
}> = React.memo(({ children }) => (
  <div className={styles.toolBarVertical}>
    <p className={styles.headerText}>Brightec Demo</p>
    {children}
  </div>
))
