import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import Spinner from "react-spinkit"
import Paper from "@material-ui/core/Paper"
import {
  PortalTable,
  Loading,
  ErrorSnack,
  ActionBlocks,
  ActionTypes,
  PortalTablePaging,
} from "../../shared"
import { IDevice } from "./Device.type"
import { DeviceColProps } from "./DeviceColProps"
import { DeviceCreate } from "./DeviceCreate/DeviceCreate"
import { DeviceUpdate } from "./DeviceUpdate/DeviceUpdate"
import { GET_ALL_DEVICES } from "./DeviceQueries"

export const DeviceList = () => {
  const [errorSnack, setErrorSnack] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [showAddNew, setShowAddNew] = useState(false)
  const [viewUpdate, setViewUpdate] = useState({
    show: false,
    id: "",
  })

  const { loading, error, data, refetch } = useQuery(GET_ALL_DEVICES)

  const rows: IDevice[] =
    data && data.devices && data.devices.length !== 0 ? data.devices : []

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleTableRowClick = e => {
    setViewUpdate({
      show: true,
      id: e.id,
    })
  }

  const pagedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  const actionEvents = {
    [ActionTypes.ADDNEW]: () => setShowAddNew(true),
  }

  const pagesOptions = [100, 150, 200]

  return (
    <Paper>
      {loading && <Loading spinner={<Spinner name="line-scale" />} />}
      {error && (
        <ErrorSnack
          error={error!.message}
          open={error! && !errorSnack}
          handleClose={() => setErrorSnack(true)}
        />
      )}
      {!loading && !error && (
        <>
          <ActionBlocks actionEvents={actionEvents}>
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
          <PortalTable<IDevice>
            objects={pagedRows}
            properties={DeviceColProps}
            handleRowClick={handleTableRowClick}
            showCheckBoxColumn
          />
          {showAddNew && (
            <DeviceCreate
              closeDialog={() => setShowAddNew(false)}
              refreshData={() => refetch()}
            />
          )}
          {viewUpdate.show && (
            <DeviceUpdate
              id={viewUpdate.id}
              closeDialog={() =>
                setViewUpdate({
                  show: false,
                  id: "",
                })
              }
            />
          )}
        </>
      )}
    </Paper>
  )
}
