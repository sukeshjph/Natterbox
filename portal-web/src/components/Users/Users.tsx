import React, { useEffect, useReducer } from "react"
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
} from "../shared"
import {
  removeError,
  setUserDetails,
  setPageLength,
  setCurrentPageIndex,
  setColumnsToShow,
  setCurrentUser,
  setShowAddNew,
} from "./UserActions"
import { userReducer, initialUserState } from "./UserReducer"
import { IUsersWithPagers } from "./User.type"
import UserUpdate from "./components/UserUpdate"
import UserCreate from "./components/UserCreate"

import { GET_ALL_USERS_PAGINATED } from "./UserQueries"
import styles from "./Users.module.scss"

const pagerOptions = [100, 150, 250, 400]

export const Users = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)

  const {
    pageLength,
    currentPageIndex,
    columnsToShow,
    currentUser,
    userDetails,
    showError,
    showAddNew,
  } = state

  const [loadUsers, { called, loading, error, data, refetch }] = useLazyQuery(
    GET_ALL_USERS_PAGINATED,
    {
      variables: {
        index: currentPageIndex,
        length: pageLength,
      },
      notifyOnNetworkStatusChange: true,
    },
  )

  useEffect(() => {
    loadUsers()
  }, [])

  const usersWithPagers: IUsersWithPagers =
    data && data.usersPaginated
      ? data.usersPaginated
      : {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 0,
          users: [],
        }

  const {
    count,
    hasMore,
    firstIndex,
    lastIndex,
    prevIndex,
    nextIndex,
    users: rows,
  } = usersWithPagers

  const handlePageSizeChange = event => {
    dispatch(setPageLength(event.target.value))
    loadUsers()
  }

  const handlePageNavigation = (pageIndex: number) => () => {
    dispatch(setCurrentPageIndex(pageIndex))
    loadUsers()
  }

  const handleTableRowClick = (row: Partial<IUser>) => {
    dispatch(setUserDetails(true))
    dispatch(
      setCurrentUser({
        userId: row.userId!,
        userName: row.userName!,
        firstName: row.firstName!,
        lastName: row.lastName!,
        middleNames: row.middleNames!,
      }),
    )
  }

  const handlePrefChange = (inputCols: IColType<IUser>[]) =>
    dispatch(setColumnsToShow(inputCols))

  const actions = {
    [ActionTypes.ADDNEW]: {
      event: () => dispatch(setShowAddNew(true)),
    },
  }

  return (
    <Paper>
      {called && loading && <Loading spinner={<Spinner name="line-scale" />} />}
      {error && (
        <ErrorSnack
          error={error!.message}
          open={error! && !showError}
          handleClose={removeError}
        />
      )}
      {showAddNew && (
        <UserCreate
          closeDialog={() => dispatch(setShowAddNew(false))}
          refreshData={() => refetch()}
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
          <PortalTable<IUser>
            objects={rows}
            properties={columnsToShow.filter(column => column.show)}
            handleRowClick={handleTableRowClick}
            showCheckBoxColumn
          />
          {userDetails && (
            <UserUpdate
              user={currentUser}
              showDialog={userDetails}
              closeDialog={() => dispatch(setUserDetails(false))}
              refetch={refetch}
            />
          )}
        </>
      )}
    </Paper>
  )
}
