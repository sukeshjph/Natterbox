import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import Spinner from "react-spinkit"
import Paper from "@material-ui/core/Paper"
import {
  PortalTable,
  Loading,
  ErrorSnack,
  ActionBlocks,
  PortalTablePaging,
} from "../shared"
import { IUser } from "./User.type"
import { UserColProps } from "./UserColProps"
import { UserDetails } from "./UserDetails"
import { GET_ALL_USERS } from "./UserQueries"

export const Users = () => {
  const [errorSnack, setErrorSnack] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [cUserId, setCUserId] = useState(0)
  const { loading, error, data } = useQuery(GET_ALL_USERS)

  const rows: IUser[] =
    data && data.users && data.users.length !== 0 ? data.users : []

  const handleChangePage = (event, newPage) => {
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

  const handleTableRowClick = (row: Partial<IUser>) => {
    setShowUserDetails(true)
    setCUserId(row.userId!)
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
          <PortalTable<IUser>
            objects={pagedRows}
            properties={UserColProps}
            handleRowClick={handleTableRowClick}
            showCheckBoxColumn
          />
          {showUserDetails && (
            <UserDetails
              userId={cUserId}
              showDialog={showUserDetails}
              closeDialog={() => setShowUserDetails(false)}
            />
          )}
        </>
      )}
    </Paper>
  )
}
