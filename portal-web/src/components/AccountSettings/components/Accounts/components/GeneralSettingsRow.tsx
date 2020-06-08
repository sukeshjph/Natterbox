import React from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

interface TableRowProps {
  headerText?: string
  headerStyle?: any
  contentChildren: React.ReactNode
  contentStyle?: any
  colSpan?: number
}

export const GeneralSettingsCommonRow = ({
  headerText,
  headerStyle,
  contentStyle,
  contentChildren,
  colSpan = 1,
}: TableRowProps) => {
  return (
    <TableRow>
      {headerText && (
        <TableCell component="th" scope="row" className={headerStyle}>
          {headerText}
        </TableCell>
      )}
      <TableCell className={contentStyle} colSpan={colSpan}>
        {contentChildren}
      </TableCell>
    </TableRow>
  )
}
