import React from "react"
import Button from "@material-ui/core/Button"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import styles from "../../CallLog.module.scss"

type colType = React.ReactNode | string

type ownProps = {
  rowKey?: string
  rowIndex: number
  columns: colType[]
  handleAddRow: () => void
  handleRemoveRow: (rowIndex: number) => void
  showRemoveButton: boolean
}

export const CallLogSearchRow: React.FC<ownProps> = ({
  columns,
  handleAddRow,
  handleRemoveRow,
  showRemoveButton,
  rowIndex,
}) => {
  return (
    <TableRow hover>
      {columns.map(col => (
        <TableCell className={styles.tableCell}>{col}</TableCell>
      ))}
      <TableCell className={`${styles.tableCell} ${styles.tableCellButton}`}>
        <Button
          color="primary"
          variant="contained"
          className={styles.addRemoveButton}
          onClick={handleAddRow}>
          Add
        </Button>
        {showRemoveButton && (
          <Button
            color="primary"
            variant="contained"
            className={styles.addRemoveButton}
            onClick={() => handleRemoveRow(rowIndex)}>
            Remove
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
