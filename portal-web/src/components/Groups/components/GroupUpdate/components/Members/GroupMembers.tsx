import React from "react"
import { isEmpty } from "ramda"
import clsx from "clsx"
import {
  FormControl,
  Select,
  MenuItem,
  Spinner,
  Paper,
  Checkbox,
  Button,
  ValidatorForm,
  PortalTable,
  Loading,
  ActionBlocks,
  ActionTypes,
  PortalServerPaging,
  UsersListDropDown,
  DownloadIcon,
  PlusIcon,
  pagerOptions,
  UserColProps,
} from "./GroupImports"
import { IUsersWithPagers } from "../../../../../Users/User.type"

import { useGroupMembers } from "./useGroupMembers"
import styles from "./GroupMembers.module.scss"

type ownProps = {
  id: string
  isSystemGroup: boolean
  currentMembers: string[]
}

const GroupMembers: React.FC<ownProps> = ({
  id,
  isSystemGroup,
  currentMembers,
}) => {
  // #region  custom Hook
  const {
    getGroupMembers: {
      getMembersCalled,
      getMembersLoading,
      getMembersError,
      getMembersData,
    },
    state,
    updateUserLoading,
    updatingGroup,
    usersLoading,
    allUsers,
    handlePageNavigation,
    handlePageSizeChange,
    onSubmitHandler,
    handleAddUsersToGroupChange,
    handleUsersAdd,
    handleUsersRemove,
    updateUsersCache,
    handleCheckBoxChange,
    refetch,
  } = useGroupMembers({
    id,
    currentMembers,
  })
  // #endregion

  const usersWithPagers: IUsersWithPagers =
    getMembersData && getMembersData.groupMembersPaginated
      ? getMembersData.groupMembersPaginated
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

  const getLoadingComp = () => (
    <div className={styles.usersLoadingPanel}>
      <span>Loading users...</span>
      <Spinner name="ball-clip-rotate" color="orange" />
    </div>
  )

  const formDisabled = updateUserLoading || isSystemGroup || updatingGroup

  const actions = {
    [ActionTypes.EXPORT]: {
      visible: false,
      image: <DownloadIcon />,
    },
    [ActionTypes.ADDNEW]: {
      visible: false,
      image: <PlusIcon />,
    },
    [ActionTypes.REMOVE]: {
      event: handleUsersRemove,
      disabled: updatingGroup,
    },
  }

  const getMappedRowsWithSelection = (
    users: IUser[],
  ): (IUser & { rowSelected: boolean })[] =>
    users.map(user => {
      if (
        !isEmpty(state.membersToRemove) &&
        state.membersToRemove.includes(parseInt(user.userId.toString(), 10))
      ) {
        return {
          ...user,
          rowSelected: true,
        }
      }

      return { ...user, rowSelected: false }
    })

  const getUpdatedMemberColumns = () =>
    UserColProps.map(column => {
      if (column.key === "primaryGroupId") {
        return {
          ...column,
          render: (_, object, key) => (
            <Checkbox
              checked={!!object[column.key]}
              onChange={e => {
                updateUsersCache(key, object, e) // eslint-disable-line
              }}
            />
          ),
        }
      }

      if (column.key === "loggedIn") {
        return {
          ...column,
          render: (_, object, key) => (
            <Checkbox
              checked={object[column.key]}
              onChange={e => {
                updateUsersCache(key, object, e) // eslint-disable-line
              }}
            />
          ),
        }
      }

      return column
    }).filter(column => column.show)

  return (
    <Paper className={styles.usersMainPanel}>
      <ValidatorForm onSubmit={onSubmitHandler}>
        <div className={styles.usersHeaderPanel}>
          <div className={styles.usersListPanel}>
            {usersLoading && getLoadingComp()}
            {!usersLoading && (
              <UsersListDropDown
                handleUserChange={handleAddUsersToGroupChange}
                isMulti
                customStyles={{
                  valueContainer: provided => ({
                    ...provided,
                    maxHeight: "120px",
                    overflowY: "scroll",
                  }),
                }}
                userLabel="Add these users to this group"
                classes={{
                  formControl: clsx(styles.formControl, styles.userSelect),
                  formLabel: styles.formLabel,
                }}
                users={allUsers.users}
                loadLocalUsers={false}
              />
            )}

            <Button
              type="button"
              disabled={formDisabled || usersLoading}
              onClick={handleUsersAdd}
              className={`${styles.formButton} ${styles.userAddButton}`}>
              {updatingGroup && state.currentMemberOperation === "Add"
                ? "Adding"
                : "Add"}
            </Button>
          </div>

          <div className={styles.headerButtonPanel}>
            <Button
              type="button"
              onClick={() => refetch()}
              disabled={formDisabled || (rows && rows.length === 0)}
              className={styles.userRevertChanges}>
              REVERT CHANGES
            </Button>
            <Button
              type="submit"
              disabled={formDisabled || (rows && rows.length === 0)}
              className={styles.formButton}>
              {updatingGroup ? "Updating" : "Save Changes"}
            </Button>
          </div>
        </div>
      </ValidatorForm>
      {getMembersCalled && getMembersLoading && (
        <Loading
          spinner={<Spinner name="line-scale-pulse-out-rapid" color="orange" />}
        />
      )}
      {getMembersCalled && !getMembersLoading && !getMembersError && (
        <>
          <ActionBlocks actions={actions}>
            <PortalServerPaging
              totalPagesCount={count}
              currentPage={state.currentPageIndex}
              hasMore={hasMore}
              handlePrevPage={handlePageNavigation(prevIndex)}
              handleNextPage={handlePageNavigation(nextIndex)}
              handleFirstPage={handlePageNavigation(firstIndex)}
              handleLastPage={handlePageNavigation(lastIndex)}
              pageLoading={getMembersLoading}
              isFirstPage={state.currentPageIndex === 0}
              isLastPage={state.currentPageIndex === lastIndex}>
              <FormControl>
                <Select
                  labelId="page-select"
                  id="page-select-id"
                  value={state.pageLength}
                  className={styles.pageSizeDropdown}
                  onChange={handlePageSizeChange}>
                  {pagerOptions.map(page => (
                    <MenuItem value={page}>{page}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </PortalServerPaging>
          </ActionBlocks>
          <PortalTable<IUser & { rowSelected: boolean }>
            objects={getMappedRowsWithSelection(rows)}
            properties={getUpdatedMemberColumns()}
            showCheckBoxColumn
            handleCheckBoxChange={handleCheckBoxChange}
          />
        </>
      )}
    </Paper>
  )
}

export default GroupMembers
