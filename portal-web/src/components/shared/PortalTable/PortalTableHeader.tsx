import React, { FunctionComponent } from "react"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import styles from "./PortalTable.module.scss"

interface HeaderProps {
  properties: {
    key: number | symbol | string
    label: string
  }[]
  showCheckBoxColumn?: boolean
  filterComp?: React.ReactNode
  filterRowVisible?: boolean
}

export const PortalTableHeader: FunctionComponent<HeaderProps> = ({
  properties,
  showCheckBoxColumn,
  filterComp,
  filterRowVisible,
}) => (
  <TableHead>
    {filterRowVisible ? filterComp : null}
    <TableRow>
      {showCheckBoxColumn && (
        <TableCell className={styles.portalHeaderCheckbox}>
          <Checkbox />
        </TableCell>
      )}
      {properties.map(property => (
        <TableCell
          key={String(property.key)}
          className={styles.portalHeaderCell}>
          {property.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
)
