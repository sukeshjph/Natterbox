import React, { PropsWithChildren } from "react"
import { pathOr } from "ramda"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import shortid from "shortid"
import clsx from "clsx"
import { PortalTableHeader } from "./PortalTableHeader"
import PortalTableRow from "./PortalTableRow"
import styles from "./PortalTable.module.scss"

interface Props<ObjectType> {
  objects: (ObjectType & { rowSelected?: boolean })[]
  properties: {
    key: keyof ObjectType
    label: string
    render?: (
      colData: any,
      row?: any,
      key?: string,
    ) => string | React.ReactElement
  }[]
  classes?: any
  handleRowClick?: (row: ObjectType) => void
  handleCheckBoxChange?: (row: ObjectType, rowCheck: boolean) => void
  showCheckBoxColumn?: boolean
  filterComp?: React.ReactNode
  filterRowVisible?: boolean
}

export function PortalTable<ObjectType>({
  objects,
  properties,
  handleRowClick,
  showCheckBoxColumn,
  handleCheckBoxChange,
  filterComp = null,
  filterRowVisible = true,
  classes = [],
}: PropsWithChildren<Props<ObjectType>>) {
  const tableClass = clsx([styles.portalTableContainer, ...classes])

  return (
    <TableContainer className={tableClass} data-testid="portalTable">
      <Table>
        <PortalTableHeader
          properties={properties}
          showCheckBoxColumn={showCheckBoxColumn}
          filterComp={filterComp}
          filterRowVisible={filterRowVisible}
        />
        <TableBody>
          {objects && objects.length === 0 && (
            <div className={styles.portalEmptyDiv}>No records to display</div>
          )}
          {objects &&
            objects.length !== 0 &&
            objects.map((object, index) => (
              <PortalTableRow
                key={pathOr(shortid.generate(), ["id"], object)}
                object={object}
                properties={properties}
                handleRowClick={handleRowClick}
                handleCheckBoxChange={handleCheckBoxChange}
                showCheckBoxColumn={showCheckBoxColumn}
                rowIndex={index}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
