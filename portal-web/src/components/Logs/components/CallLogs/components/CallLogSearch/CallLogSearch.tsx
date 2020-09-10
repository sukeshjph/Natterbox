import React, { useReducer } from "react"
import { omit, isNil, keys, isEmpty } from "ramda"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import "react-datepicker/dist/react-datepicker.css"
import clsx from "clsx"
import DatePicker from "react-datepicker"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import { formatISO } from "date-fns"
import Button from "@material-ui/core/Button"
import { CallLogColumnSelect } from "./CallLogColumnSelect"
import { UsersListDropDown } from "../../../../../shared"
import { searchStyles } from "../../CallLogMUIStyles"
import { searchKeys } from "../../CallLogs.type"
import { CallLogSearchRow } from "./CallLogSearchRow"
import {
  setError,
  removeError,
  setStartTime,
  setEndTime,
  setUsersLoading,
  setSearchState,
  resetForm,
  addSearchRow,
  removeSearchRow,
  updateSearchRow,
} from "../../CallLogActions"
import { searchReducer, initialSearchState } from "../../CallLogReducer"
import styles from "../../CallLog.module.scss"

const searchOptions = {
  [searchKeys.TimeStart]: "Date/Time",
  [searchKeys.FromNumber]: "From/Number",
  [searchKeys.ToNumberDialled]: "Dialled/Number",
  [searchKeys.FromUserId]: "From(User)",
  [searchKeys.Uuid]: "Uuid",
}

// #region types

type colType = React.ReactNode | string

type tableRow = {
  rowKey: string
  columns: colType[]
}

type ownProps = {
  handleSearch(): void
  isSearching: boolean
  drawerState: boolean
  handleDrawerOpen: () => void
  handleDrawerClose: () => void
}

// #endregion

export const CallLogSearch = ({
  handleSearch,
  isSearching,
  drawerState,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState)

  const handleRemoveRow = (rowIndex: number) =>
    dispatch(removeSearchRow(rowIndex))

  const updateField = (fieldType: string) => e => {
    if (fieldType === searchKeys.FromUserId) {
      dispatch(
        setSearchState({
          [searchKeys.FromUserId]: e ? e.value.trim() : null,
        }),
      )
    } else {
      dispatch(
        setSearchState({
          [fieldType]: e.target.value.trim(),
        }),
      )
    }
  }

  const getUpdatedColumns = ({ columns, rowKey }) => {
    if (rowKey) {
      return [
        ...columns.slice(0, columns.length - 1),
        rowKey === searchKeys.FromUserId ? (
          <UsersListDropDown
            handleUserChange={updateField("fromUserId")}
            usersLoaded={() => dispatch(setUsersLoading(false))}
            classes={{
              formControl: clsx(styles.formControl, styles.userSelect),
              formLabel: styles.formLabel,
            }}
            showLabel={false}
            loadingComp={
              <div className={styles.formControl}>Loading Users..</div>
            }
          />
        ) : (
          <input
            type="text"
            value={state.searchState[rowKey]}
            onChange={updateField(rowKey)}
          />
        ),
      ]
    }

    return columns
  }

  const handleOptionChange = (rowKey: string, rowIndex: number) => {
    if (rowKey === searchKeys.FromUserId) {
      dispatch(setUsersLoading(true))
    }

    dispatch(updateSearchRow({ rowKey, rowIndex }))
  }

  const validateRowAdd = () => {
    const { searchRows } = state

    const optionsAlreadyAdded = [
      searchKeys.TimeStart,
      ...searchRows.map(row => row.rowKey).filter(v => v),
    ]

    if (isNil(state.startTime) || isNil(state.endTime)) {
      dispatch(setError("Please select Date/Time range"))
      return false
    }

    if (
      !isEmpty(searchRows) &&
      searchRows.map(row => row.rowKey).some(val => isEmpty(val))
    ) {
      return false
    }

    if (keys(searchOptions).length === searchRows.length) {
      return false
    }

    if (keys(searchOptions).every(op => optionsAlreadyAdded.includes(op))) {
      return false
    }

    return true
  }

  const handleAddRow = () => {
    if (validateRowAdd()) {
      const optionsAlreadyAdded = [
        searchKeys.TimeStart,
        ...state.searchRows.map(row => row.rowKey).filter(v => v),
      ]

      dispatch(
        addSearchRow({
          rowKey: "",
          columns: [
            <>
              <span className={styles.startLabel}>and</span>
              <CallLogColumnSelect
                searchOptions={omit(optionsAlreadyAdded, searchOptions)}
                handleSelectChange={handleOptionChange}
                rowIndex={
                  state.searchRows.length !== 0 ? state.searchRows.length : 0
                }
              />
            </>,
            "",
            "is",
            "",
            <input type="text" value="" />,
          ],
        }),
      )
    }

    return false
  }

  const getDateRow = () => (
    <CallLogSearchRow
      rowKey={searchKeys.TimeStart}
      columns={[
        <>
          <span style={{ paddingRight: "5px" }}>Where</span>
          <CallLogColumnSelect
            searchOptions={searchOptions}
            handleSelectChange={() => false}
            rowIndex={0}
            initialValue={searchKeys.TimeStart}
            disabled
          />
        </>,
        "is From",
        <DatePicker
          selected={state.startTime}
          onChange={date => dispatch(setStartTime(date))}
          isClearable
        />,
        "to",
        <DatePicker
          selected={state.endTime}
          onChange={date => dispatch(setEndTime(date))}
          isClearable
        />,
      ]}
      rowIndex={0}
      handleAddRow={handleAddRow}
      handleRemoveRow={handleRemoveRow}
      showRemoveButton={false}
    />
  )

  const searchClasses = searchStyles()

  const handleLocalSearch = () => {
    const { startTime, endTime, searchState } = state

    const dateKeys = {
      ...(startTime ? { startTime: formatISO(startTime) } : {}),
      ...(endTime ? { endTime: formatISO(endTime) } : {}),
    }

    // Only non-empty keys need to be searched
    handleSearch(
      Object.keys(searchState)
        .filter(key => searchState[key])
        .reduce(
          (acc, curKey) => {
            let value = searchState[curKey]

            if (curKey === "fromUserId") {
              value = parseInt(value, 10)
            }
            return {
              ...acc,
              [curKey]: value,
            }
          },
          {
            ...dateKeys,
          },
        ),
    )

    dispatch(resetForm()) // Reset the Search form
    handleDrawerClose() // Close the Drawer
  }

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={drawerState}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        classes={{
          root: searchClasses.root,
        }}>
        <Snackbar
          open={state.showError}
          autoHideDuration={6000}
          onClose={() => dispatch(removeError())}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert onClose={() => dispatch(removeError())} severity="error">
            {state.error}
          </Alert>
        </Snackbar>
        <TableContainer>
          <Table>
            <TableBody>
              {getDateRow()}
              {state.searchRows.length !== 0 &&
                state.searchRows.map((row, index) => (
                  <CallLogSearchRow
                    rowKey={row.rowKey}
                    columns={getUpdatedColumns({
                      rowKey: row.rowKey,
                      columns: row.columns,
                    })}
                    rowIndex={index}
                    handleAddRow={handleAddRow}
                    handleRemoveRow={handleRemoveRow}
                    showRemoveButton
                  />
                ))}
              <TableRow>
                <TableCell colSpan={6} className={styles.tableCellSubmitPanel}>
                  <div className={styles.submitButtonPanel}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={styles.submitButton}
                      onClick={handleLocalSearch}
                      disabled={
                        isSearching ||
                        (!isNil(state.usersLoading) && state.usersLoading)
                      }>
                      {isSearching ? "Searching" : "Search"}
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      className={styles.submitButton}
                      onClick={() => {
                        dispatch(resetForm())
                        handleDrawerClose()
                      }}>
                      Close
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SwipeableDrawer>
    </>
  )
}
