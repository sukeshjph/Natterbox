import React from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Checkbox from "@material-ui/core/Checkbox"
import clsx from "clsx"
import styles from "./PortalTable.module.scss"
import { getColValueWithDefault } from "../../../util"

interface Props<ObjectType> {
  object: ObjectType & { rowSelected?: boolean }
  properties: {
    key: number | symbol | string
    label: string
    render?: (colData: any, row?: any, key?: any) => string | React.ReactElement
  }[]
  handleRowClick?: (row: ObjectType) => void
  handleCheckBoxChange?: (row: ObjectType, rowCheck: boolean) => void
  showCheckBoxColumn?: boolean
  rowIndex: number
}

function PortalTableRow<ObjectType>({
  object,
  properties,
  handleRowClick,
  showCheckBoxColumn = false,
  handleCheckBoxChange,
  rowIndex,
}: Props<ObjectType>) {
  const handleCheckboxClick = event => {
    event.stopPropagation()
    if (handleCheckBoxChange) {
      handleCheckBoxChange(object, event.target.checked)
    }
  }

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      onClick={handleRowClick ? () => handleRowClick(object) : () => undefined}
      className={clsx(
        handleRowClick && styles.rowClickable,
        rowIndex % 2 === 0 && styles.portalRowEven,
      )}>
      {showCheckBoxColumn && (
        <TableCell padding="checkbox">
          <Checkbox
            onClick={handleCheckboxClick}
            checked={object.rowSelected}
          />
        </TableCell>
      )}
      {properties.map(property => (
        <TableCell
          id={String(property.key)}
          align="left"
          className={styles.portalDataCell}>
          {property.render
            ? property.render(
                getColValueWithDefault(object[property.key]),
                object,
                property.key,
              )
            : getColValueWithDefault(object[property.key])}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default PortalTableRow
