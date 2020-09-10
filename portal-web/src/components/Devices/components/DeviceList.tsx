import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Spinner from "react-spinkit"
import Paper from "@material-ui/core/Paper"
import {
  PortalTable,
  Loading,
  ErrorSnack,
  ActionBlocks,
  ActionTypes,
  PortalServerPaging,
  Preferences,
} from "../../shared"
import { IDeviceWithPagers } from "./Device.type"
import { DeviceColProps } from "./DeviceColProps"
import { DeviceCreate } from "./DeviceCreate/DeviceCreate"
import { DeviceUpdate } from "./DeviceUpdate/DeviceUpdate"
import { GET_ALL_DEVICES_PAGINATED } from "./DeviceQueries"
import styles from "./Device.module.scss"

const pagerOptions = [100, 150, 250, 400]

export const DeviceList = () => {
  const [errorSnack, setErrorSnack] = useState(false)
  const [showAddNew, setShowAddNew] = useState(false)
  const [pageLength, setPageLength] = useState(pagerOptions[0])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [columnsToShow, setColumnsToShow] = useState(DeviceColProps)
  const [viewUpdate, setViewUpdate] = useState({
    show: false,
    id: "",
  })

  const [loadDevices, { called, loading, error, data, refetch }] = useLazyQuery(
    GET_ALL_DEVICES_PAGINATED,
    {
      variables: {
        index: currentPageIndex,
        length: pageLength,
      },
    },
  )

  useEffect(() => {
    loadDevices()
  }, [])

  const DevicesWithPagers: IDeviceWithPagers =
    data && data.devicesPaginated
      ? data.devicesPaginated
      : {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 0,
          devices: [],
        }

  const {
    count,
    hasMore,
    firstIndex,
    lastIndex,
    prevIndex,
    nextIndex,
    devices: rows,
  } = DevicesWithPagers

  const handlePageSizeChange = event => {
    setPageLength(event.target.value)
    loadDevices()
  }

  const handlePageNavigation = (pageIndex: number) => () => {
    setCurrentPageIndex(pageIndex)
    loadDevices()
  }

  const handleTableRowClick = e => {
    setViewUpdate({
      show: true,
      id: e.id,
    })
  }

  const handlePrefChange = (inputCols: IColType<IDevice>[]) =>
    setColumnsToShow(inputCols)

  const actions = {
    [ActionTypes.ADDNEW]: {
      event: () => setShowAddNew(true),
    },
  }

  return (
    <Paper>
      {called && loading && <Loading spinner={<Spinner name="line-scale" />} />}
      {error && (
        <ErrorSnack
          error={error!.message}
          open={error! && !errorSnack}
          handleClose={() => setErrorSnack(true)}
        />
      )}
      {!loading && !error && (
        <>
          <ActionBlocks
            actions={actions}
            preferences={
              <Preferences
                columns={columnsToShow}
                handlePrefChange={handlePrefChange}
                showFilter={() => undefined}
              />
            }>
            <PortalServerPaging
              totalPagesCount={count}
              currentPage={currentPageIndex}
              hasMore={hasMore}
              handlePrevPage={handlePageNavigation(prevIndex)}
              handleNextPage={handlePageNavigation(nextIndex)}
              handleFirstPage={handlePageNavigation(firstIndex)}
              handleLastPage={handlePageNavigation(lastIndex)}
              pageLoading={loading}
              isFirstPage={currentPageIndex === 0}
              isLastPage={currentPageIndex === lastIndex}>
              <FormControl>
                <Select
                  labelId="page-select"
                  id="page-select-id"
                  value={pageLength}
                  className={styles.pageSizeDropdown}
                  onChange={handlePageSizeChange}>
                  {pagerOptions.map(page => (
                    <MenuItem value={page}>{page}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </PortalServerPaging>
          </ActionBlocks>
          <PortalTable<IDevice>
            objects={rows}
            properties={columnsToShow.filter(column => column.show)}
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
              refreshData={() => refetch()}
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
