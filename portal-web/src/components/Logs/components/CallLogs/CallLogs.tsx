import React, { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import Spinner from "react-spinkit"
import Paper from "@material-ui/core/Paper"
import {
  PortalTable,
  Loading,
  ErrorSnack,
  ActionBlocks,
  PortalTablePaging,
  PortalTableFilter,
} from "../../../shared"
import styles from "./CallLog.module.scss"
import { CallLogSearch } from "./CallLogSearch"
import { ICallLog, ISearchParams } from "./CallLogs.type"
import { CallLogProps } from "./CallLogColProps"
import { GET_CALL_LOGS } from "./CallLogQueries"

export const CallLogs = () => {
  const [errorSnack, setErrorSnack] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [searchInput, setSearchInput] = useState<Partial<ISearchParams> | null>(
    null,
  )
  const [loadCallLogs, { called, loading, error, data }] = useLazyQuery(
    GET_CALL_LOGS,
    {
      variables: { searchInput },
    },
  )

  const rows: ICallLog[] =
    data && data.callLogs && data.callLogs.length !== 0 ? data.callLogs : []

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const pagedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  const pagesOptions = [100, 150, 200]

  useEffect(() => {
    loadCallLogs()
  }, [])

  return (
    <Paper className={styles.paper} data-testid="CallLogs">
      {called && loading && <Loading spinner={<Spinner name="line-scale" />} />}
      {error && (
        <ErrorSnack
          error={error!.message}
          open={error! && !errorSnack}
          handleClose={() => setErrorSnack(true)}
          data-testid="CallLogError"
        />
      )}
      {!loading && !error && (
        <>
          <CallLogSearch
            {...{
              handleSearch: (searchParams: Partial<ISearchParams>) => {
                setSearchInput({
                  ...searchParams,
                })
                loadCallLogs()
              },
              isSearching: loading,
            }}
          />
          <ActionBlocks>
            <PortalTablePaging
              rowsPerPageOptions={
                rows && rows.length !== 0
                  ? [
                      ...pagesOptions,
                      ...(rows.length > 200 ? [rows.length] : []),
                    ]
                  : pagesOptions
              }
              pagesCount={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </ActionBlocks>
          <PortalTable<ICallLog>
            objects={pagedRows}
            properties={CallLogProps}
            showCheckBoxColumn
          />
        </>
      )}
    </Paper>
  )
}
