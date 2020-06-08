import React from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { filterDataTypes } from "../../../../common.types"

const getFilterComp = (type: filterDataTypes) => {
  if (type === filterDataTypes.String || type === filterDataTypes.Number) {
    return <input type="text" />
  }
}

export const PortalTableFilter: React.FC<{
  filterObjects: IFilterType[]
}> = React.memo(({ filterObjects }) => {
  return (
    <TableRow tabIndex={-1}>
      <TableCell padding="checkbox" />

      {filterObjects.map(property => (
        <TableCell id={String(property.key)} align="left">
          {getFilterComp(property.colType)}
        </TableCell>
      ))}
    </TableRow>
  )
})
