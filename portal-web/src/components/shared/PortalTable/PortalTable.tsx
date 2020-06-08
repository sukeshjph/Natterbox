import React, { PropsWithChildren } from "react"
import { pathOr } from "ramda"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import shortid from "shortid"
import { PortalTableHeader } from "./PortalTableHeader"
import PortalTableRow from "./PortalTableRow"
import styles from "./PortalTable.module.scss"

interface Props<ObjectType> {
  objects: ObjectType[]
  properties: {
    key: keyof ObjectType
    label: string
    render?: (colData: any) => string | React.ReactElement
  }[]
  classes?: any
  handleRowClick?: (row: ObjectType) => void
  showCheckBoxColumn?: boolean
}

export function PortalTable<ObjectType>({
  objects,
  properties,
  handleRowClick,
  showCheckBoxColumn,
}: PropsWithChildren<Props<ObjectType>>) {
  return (
    <TableContainer
      className={styles.portalTableContainer}
      data-testid="portalTable">
      <Table>
        <PortalTableHeader
          properties={properties}
          showCheckBoxColumn={showCheckBoxColumn}
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
                showCheckBoxColumn={showCheckBoxColumn}
                rowIndex={index}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
