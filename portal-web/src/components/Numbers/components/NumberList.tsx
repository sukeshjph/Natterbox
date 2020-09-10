import React, { useEffect, useReducer } from "react"
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
  Preferences,
} from "../../shared"
import { INumberWithPagers, INumber } from "./Number.type"
import {
  removeError,
  setShowAddNew,
  setPageLength,
  setCurrentPageIndex,
  setColumnsToShow,
  setShowUpdateView,
  setCurrentNumber,
} from "./NumberActions"
import { GET_ALL_NUMBERS } from "./NumberQueries"
import { NumberCreate } from "./NumberCreate/NumberCreate"
import { NumberUpdate } from "./NumberUpdate/NumberUpdate"
import { initialNumberState, numberReducer } from "./NumberReducer"

import styles from "./Numbers.module.scss"

const pagerOptions = [100, 150, 250, 400]

export const NumberList = () => {
  const [state, dispatch] = useReducer(numberReducer, initialNumberState)

  const {
    columnsToShow,
    showAddNew,
    showUpdateView,
    showError,
    pageLength,
    currentPageIndex,
    currentNumber,
  } = state

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
    dispatch(setPageLength(event.target.value))
    loadNumbers()
  }

  const handlePageNavigation = (pageIndex: number) => () => {
    dispatch(setCurrentPageIndex(pageIndex))
    loadNumbers()
  }

  const handleTableRowClick = (number: INumber) => {
    dispatch(setShowUpdateView(true))
    dispatch(setCurrentNumber(number))
  }

  const handlePrefChange = (inputCols: IColType<INumber>[]) =>
    dispatch(setColumnsToShow(inputCols))

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
          open={error! && !showError}
          handleClose={() => dispatch(removeError())}
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
          <PortalTable<INumber>
            objects={rows}
            properties={columnsToShow.filter(column => column.show)}
            handleRowClick={handleTableRowClick}
            showCheckBoxColumn
          />
          {showAddNew && (
            <NumberCreate closeDialog={() => setShowAddNew(false)} />
          )}
          {showUpdateView && (
            <NumberUpdate
              number={currentNumber!}
              refetchNumbers={refetch}
              closeDialog={() => dispatch(setShowUpdateView(false))}
            />
          )}
        </>
      )}
    </Paper>
  )
}
