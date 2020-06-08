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
  ActionTypes,
  PortalServerPaging,
} from "../../shared"
import { INumberWithPagers, INumber } from "./Number.type"
import { NumberColProps } from "./NumberColProps"
import { GET_ALL_NUMBERS } from "./NumberQueries"
import { NumberCreate } from "./NumberCreate/NumberCreate"
import { NumberUpdate } from "./NumberUpdate/NumberUpdate"

import styles from "./Numbers.module.scss"

const pagerOptions = [100, 150, 250, 400]

export const NumberList = () => {
  const [errorSnack, setErrorSnack] = useState(false)
  const [showAddNew, setShowAddNew] = useState(false)
  const [viewUpdate, setViewUpdate] = useState<{
    show: boolean
    number?: INumber
  }>({
    show: false,
    number: {
      label: null,
      number: null,
      countryCode: null,
      userId: null,
      policyId: null,
    },
  })
  const [pageLength, setPageLength] = useState(pagerOptions[0])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const [loadNumbers, { called, loading, error, data, refetch }] = useLazyQuery(
    GET_ALL_NUMBERS,
    {
      variables: {
        index: currentPageIndex,
        length: pageLength,
      },
    },
  )

  useEffect(() => {
    loadNumbers()
  }, [])

  const numbersWithPagers: INumberWithPagers =
    data && data.numbersPaginated
      ? data.numbersPaginated
      : {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 0,
          numbers: [],
        }

  const {
    count,
    hasMore,
    firstIndex,
    lastIndex,
    prevIndex,
    nextIndex,
    numbers: rows,
  } = numbersWithPagers

  const handlePageSizeChange = event => {
    setPageLength(event.target.value)
    loadNumbers()
  }

  const handlePageNavigation = (pageIndex: number) => () => {
    setCurrentPageIndex(pageIndex)
    loadNumbers()
  }

  const handleTableRowClick = (number: INumber) => {
    setViewUpdate({
      show: true,
      number,
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
          <PortalTable<INumber>
            objects={rows}
            properties={NumberColProps}
            handleRowClick={handleTableRowClick}
            showCheckBoxColumn
          />
          {showAddNew && (
            <NumberCreate closeDialog={() => setShowAddNew(false)} />
          )}
          {viewUpdate.show && (
            <NumberUpdate
              number={viewUpdate.number!}
              refetchNumbers={refetch}
              closeDialog={() =>
                setViewUpdate({
                  show: false,
                })
              }
            />
          )}
        </>
      )}
    </Paper>
  )
}
