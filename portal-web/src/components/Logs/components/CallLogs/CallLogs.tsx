import React, { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import Spinner from "react-spinkit"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { isEmpty, isNil } from "ramda"
import {
  parseISO,
  isAfter,
  isBefore,
  toDate,
  differenceInCalendarDays,
} from "date-fns"
import Paper from "@material-ui/core/Paper"
import {
  PortalTable,
  Loading,
  ErrorSnack,
  ActionBlocks,
  PortalServerPaging,
  Preferences,
  PortalTableFilter,
  ActionTypes,
} from "../../../shared"
import styles from "./CallLog.module.scss"
import { CallLogSearch } from "./components/CallLogSearch/CallLogSearch"
import {
  ICallLog,
  ICalllogsWithPagers,
  ISearchParams,
  Directions,
  ConType,
  Flags,
} from "./CallLogs.type"
import { CallLogProps } from "./CallLogColProps"
import { GET_CALL_LOGS_PAGINATED } from "./CallLogQueries"
import { filterDataTypes, filterCompareTypes } from "../../../../common.types"

type colFilter = {
  key: string
  value: any
  colType: filterDataTypes
  compareType: filterCompareTypes
}

const pagerOptions = [100, 150, 250, 400]

export const CallLogs = () => {
  // #region state keys
  const [errorSnack, setErrorSnack] = useState(false)
  const [drawerState, setDrawerState] = useState(false)
  const [filterRowVisible, setFilterRowVisible] = useState(true)
  const [pageLength, setPageLength] = useState(pagerOptions[0])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [searchInput, setSearchInput] = useState<Partial<ISearchParams> | null>(
    null,
  )
  const [columnsToShow, setColumnsToShow] = useState(CallLogProps)
  const [colFilters, setColFilters] = useState<colFilter[]>([])
  // #endregion

  const [loadCallLogs, { called, loading, error, data }] = useLazyQuery(
    GET_CALL_LOGS_PAGINATED,
    {
      variables: { searchInput, index: currentPageIndex, length: pageLength },
    },
  )

  // #region functions
  const getColumnOptions = (colKey: string) => {
    if (["flags", "type", "direction"].includes(colKey)) {
      return {
        options: {
          flags: Object.values(Flags),
          type: Object.values(ConType),
          direction: Object.values(Directions),
        }[colKey],
      }
    }
    return {}
  }

  const handlePrefChange = (inputCols: IColType<ICallLog>[]) =>
    setColumnsToShow(inputCols)

  const handleColumnFilterChange = (key: string) => (
    value: any,
    colType: filterDataTypes,
    compareType: filterCompareTypes = filterCompareTypes.Contains,
  ) => {
    if (isEmpty(colFilters)) {
      setColFilters(prevFilters => [
        ...prevFilters,
        {
          key,
          value,
          colType,
          compareType,
        },
      ])

      return
    }

    const currentFilterObjIndex = colFilters.findIndex(colF => colF.key === key)

    if (currentFilterObjIndex === -1 && !isEmpty(value)) {
      setColFilters(prevFilters => [
        ...prevFilters,
        {
          key,
          value,
          colType,
          compareType,
        },
      ])
    } else {
      const updatedFilters =
        isEmpty(value) || isNil(value)
          ? colFilters.filter(fKey => fKey.key !== key)
          : [
              ...colFilters.slice(0, currentFilterObjIndex),
              {
                key,
                value,
                colType,
                compareType,
              },
              ...colFilters.slice(currentFilterObjIndex + 1),
            ]

      setColFilters(updatedFilters)
    }
  }

  const getFilterableColumns = () =>
    columnsToShow.map(col => {
      const { key, colType, filterable } = col

      const anyFilterValue = colFilters.find(fl => fl.key === key) || {
        value: colType === filterDataTypes.DateTime ? null : "",
      }

      return {
        key,
        colType: colType || filterDataTypes.String,
        filterable,
        value: anyFilterValue.value,
        handleColFilterChange: handleColumnFilterChange(key),
        ...getColumnOptions(key),
      }
    })

  const colCompare = (rowValue: any, cFilter: colFilter) => {
    const { colType, value, compareType } = cFilter

    if (colType === filterDataTypes.DateTime) {
      const dateCompare = toDate(cFilter.value)
      const rowDate = parseISO(rowValue)

      if (compareType === filterCompareTypes.Equal) {
        return Math.abs(differenceInCalendarDays(rowDate, dateCompare)) === 0
      }
      if (compareType === filterCompareTypes.GreaterThan) {
        return isAfter(rowDate, dateCompare)
      }
      if (compareType === filterCompareTypes.LessThan) {
        return isBefore(rowDate, dateCompare)
      }

      return false
    }

    if (colType === filterDataTypes.Choice) {
      return value === "All"
        ? true
        : rowValue.toUpperCase() === cFilter.value.toUpperCase()
    }

    return rowValue.toUpperCase().includes(value.trim().toUpperCase())
  }

  const getFilteredRows = (inputRows: ICallLog[]) =>
    !isEmpty(colFilters)
      ? colFilters.reduce(
          (accRows, curFilter) =>
            accRows.filter(row =>
              row[curFilter.key]
                ? colCompare(row[curFilter.key], curFilter)
                : false,
            ),
          inputRows,
        )
      : inputRows

  const handlePageSizeChange = event => {
    setPageLength(event.target.value)
    loadCallLogs()
  }

  const handlePageNavigation = (pageIndex: number) => () => {
    setCurrentPageIndex(pageIndex)
    loadCallLogs()
  }
  // #endregion

  const actions = {
    [ActionTypes.SEARCH]: {
      visible: true,
      event: () => setDrawerState(!drawerState),
    },
    [ActionTypes.HIDEFILTER]: {
      visible: filterRowVisible,
      event: () => setFilterRowVisible(false),
    },
    [ActionTypes.SHOWFILTER]: {
      visible: !filterRowVisible,
      event: () => setFilterRowVisible(true),
    },
    [ActionTypes.CLEARFILTER]: {
      event: () => setColFilters([]),
    },
  }

  useEffect(() => {
    loadCallLogs()
  }, [])

  const callLogsWithPagers: ICalllogsWithPagers =
    data && data.callLogsPaginated
      ? data.callLogsPaginated
      : {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 0,
          callLogs: [],
        }

  const {
    count,
    hasMore,
    firstIndex,
    lastIndex,
    prevIndex,
    nextIndex,
    callLogs: rows,
  } = callLogsWithPagers

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
              drawerState,
              handleDrawerOpen: () => setDrawerState(true),
              handleDrawerClose: () => setDrawerState(false),
            }}
          />

          <ActionBlocks
            actions={actions}
            preferences={
              <Preferences
                columns={columnsToShow}
                handlePrefChange={handlePrefChange}
                showFilter={(chk: boolean) => setFilterRowVisible(chk)}
                filterRowVisible={filterRowVisible}
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

          <PortalTable<ICallLog>
            objects={getFilteredRows(rows)}
            properties={columnsToShow.filter(column => column.show)}
            showCheckBoxColumn
            filterComp={
              <PortalTableFilter filterObjects={getFilterableColumns()} />
            }
            filterRowVisible={filterRowVisible}
          />
        </>
      )}
    </Paper>
  )
}
