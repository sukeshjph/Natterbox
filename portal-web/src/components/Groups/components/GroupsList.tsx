import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import Spinner from "react-spinkit"
import Paper from "@material-ui/core/Paper"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import {
  PortalTable,
  Loading,
  ErrorSnack,
  ActionBlocks,
  PortalServerPaging,
  ActionTypes,
} from "../../shared"
import { IGroupPagination, IGroup } from "./Groups.type"
import { GroupColProps } from "./GroupsColProps"
import { GET_ALL_GROUPS_PAGINATED } from "./GroupsQueries"

import styles from "./Groups.module.scss"
import { GroupUpdate } from "./GroupUpdate/GroupUpdate"
import { GroupCreate } from "./GroupCreate/GroupCreate"

const pagerOptions = [100, 150, 250, 400]

export const GroupsList = () => {
  const [errorSnack, setErrorSnack] = useState(false)
  const [showAddNew, setShowAddNew] = useState(false)
  const [pageLength, setPageLength] = useState(pagerOptions[0])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [viewUpdate, setViewUpdate] = useState<{
    show: boolean
    id: string
  }>({
    show: false,
    id: "",
  })

  const [loadGroups, { called, loading, error, data }] = useLazyQuery(
    GET_ALL_GROUPS_PAGINATED,
    {
      variables: {
        index: currentPageIndex,
        length: pageLength,
      },
    },
  )

  useEffect(() => {
    loadGroups()
  }, [])

  const GroupsWithPagers: IGroupPagination =
    data && data.groupsPaginated
      ? data.groupsPaginated
      : {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 0,
          Groups: [],
        }

  const {
    count,
    hasMore,
    firstIndex,
    lastIndex,
    prevIndex,
    nextIndex,
    groups: rows,
  } = GroupsWithPagers

  const handlePageSizeChange = event => {
    setPageLength(event.target.value)
    loadGroups()
  }

  const handlePageNavigation = (pageIndex: number) => () => {
    setCurrentPageIndex(pageIndex)
    loadGroups()
  }

  const handleTableRowClick = e => {
    setViewUpdate({
      show: true,
      id: e.id,
    })
  }

  const actionEvents = {
    [ActionTypes.ADDNEW]: () => setShowAddNew(true),
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
          <ActionBlocks actionEvents={actionEvents}>
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
          <PortalTable<IGroup>
            objects={rows}
            properties={GroupColProps}
            showCheckBoxColumn
            handleRowClick={handleTableRowClick}
          />
          {showAddNew && (
            <GroupCreate closeDialog={() => setShowAddNew(false)} />
          )}
          {viewUpdate.show && (
            <GroupUpdate
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
