import React from "react"
import TablePagination from "@material-ui/core/TablePagination"
import { pagerStyles } from "./PortalPagerMUIStyles"

interface ITablePager {
  rowsPerPageOptions?: number[]
  pagesCount: number
  page: number
  rowsPerPage: number
  handleChangePage(_, newPage: number): void
  handleChangeRowsPerPage(event: any): void
}

export const PortalTablePaging: React.FC<ITablePager> = React.memo(
  ({
    rowsPerPageOptions = [100, 150, 200],
    pagesCount,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  }) => {
    const pagerClasses = pagerStyles()

    return (
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={pagesCount}
        labelRowsPerPage="Pages"
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        classes={{
          toolbar: pagerClasses.toolbar,
          actions: pagerClasses.actions,
        }}
      />
    )
  },
)
