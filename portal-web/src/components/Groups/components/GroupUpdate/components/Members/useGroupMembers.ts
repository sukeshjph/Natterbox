// #region Imports

import { useReducer, useEffect } from "react"
import { uniq } from "ramda"
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks"

import {
  GET_GROUP_MEMBERS,
  UPDATE_USERS,
  GET_ALL_USERS,
} from "./GroupMemberQueries"

import { UPDATE_GROUP } from "../../../GroupsQueries"

import {
  initialState,
  userReducer,
  setPageLength,
  setCurrentPageIndex,
  setGroupMembersCache,
  resetGroupMembersToRemove,
  setGroupMembersLoading,
  setGroupMemberToAdd,
  setGroupMemberToRemove,
  setCurrentMemberOperation,
} from "./GroupImports"

// #endregion

type ownProps = {
  id: string
  currentMembers: string[]
}

export const useGroupMembers = ({ id, currentMembers }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const [
    loadMembers,
    {
      called: getMembersCalled,
      loading: getMembersLoading,
      error: getMembersError,
      data: getMembersData,
      refetch,
      updateQuery,
    },
  ] = useLazyQuery(GET_GROUP_MEMBERS, {
    variables: {
      index: state.currentPageIndex,
      length: state.pageLength,
      id,
    },
    notifyOnNetworkStatusChange: true,
  })

  const [updateUsers, { loading: updateUserLoading }] = useMutation(
    UPDATE_USERS,
    {
      onCompleted() {
        refetch()
      },
    },
  )

  const [updateGroup, { loading: updatingGroup }] = useMutation(UPDATE_GROUP, {
    onCompleted() {
      dispatch(setCurrentMemberOperation(""))
      refetch()
    },
  })

  const { loading: usersLoading, data: allUsers } = useQuery(GET_ALL_USERS)

  useEffect(() => {
    loadMembers()
    dispatch(setGroupMembersLoading(true))
  }, [])

  const handlePageSizeChange = event => {
    dispatch(setPageLength(event.target.value))
    loadMembers()
  }

  const handlePageNavigation = (pageIndex: number) => () => {
    dispatch(setCurrentPageIndex(pageIndex))
    loadMembers()
  }

  const handleCheckBoxChange = (row: IUser, chkStatus) => {
    const { userId } = row

    if (chkStatus) {
      dispatch(
        setGroupMemberToRemove({
          type: "add",
          userId: parseInt(userId.toString(), 10),
        }),
      )
    } else {
      dispatch(
        setGroupMemberToRemove({
          type: "remove",
          userId: parseInt(userId.toString(), 10),
        }),
      )
    }
  }

  const onSubmitHandler = () => {
    updateUsers({
      variables: {
        id,
        users: state.membersCache,
      },
    })
  }

  const handleAddUsersToGroupChange = options => {
    if (options && options.length !== 0) {
      dispatch(setGroupMemberToAdd(options.map(op => parseInt(op.value, 10))))
    }
  }

  const handleUsersAdd = () => {
    const { membersToAdd } = state

    dispatch(setCurrentMemberOperation("Add"))

    const group = {
      members: {
        users: uniq([
          ...currentMembers.map(m => parseInt(m.toString(), 10)),
          ...membersToAdd,
        ]),
      },
    }

    updateGroup({
      variables: {
        id,
        group,
      },
    }).catch(() => {})

    dispatch(setGroupMemberToAdd([]))
  }

  const handleUsersRemove = () => {
    const { membersToRemove } = state
    dispatch(setCurrentMemberOperation("Remove"))

    const group = {
      members: {
        users: currentMembers
          .map(m => parseInt(m.toString(), 10))
          .filter(member => !membersToRemove.includes(member)),
      },
    }

    updateGroup({
      variables: {
        id,
        group,
      },
    }).catch(() => {})

    dispatch(resetGroupMembersToRemove())
  }

  const updateUsersCache = (rowKey, object, e) => {
    let user = {
      userId: null,
    }

    // Check if user already exists in cache
    if (state.membersCache[object.userId]) {
      user = {
        ...state.membersCache[object.userId],
      }
    } else {
      user = {
        ...object,
      }
    }

    // also update the list of users from the original query as it drives the render of the checkbox
    if (rowKey === "loggedIn") {
      // modify user object
      user[rowKey] = e.target.checked

      // save back user to the cached list
      dispatch(setGroupMembersCache(user))

      updateQuery(data1 => {
        return {
          ...data1,
          groupMembersPaginated: {
            ...data1.groupMembersPaginated,
            users: data1.groupMembersPaginated.users.map(mappedUser => {
              if (object.userId === mappedUser.userId) {
                return {
                  ...mappedUser,
                  [rowKey]: e.target.checked,
                }
              }
              return mappedUser
            }),
          },
        }
      })
    }

    if (rowKey === "primaryGroupId") {
      // modify user object
      user[rowKey] = e.target.checked ? id : null

      // save back user to the cached list
      dispatch(setGroupMembersCache(user))

      updateQuery(data1 => {
        return {
          ...data1,
          groupMembersPaginated: {
            ...data1.groupMembersPaginated,
            users: data1.groupMembersPaginated.users.map(mappedUser => {
              if (object.userId === mappedUser.userId) {
                return {
                  ...mappedUser,
                  [rowKey]: e.target.checked ? id : null,
                }
              }
              return mappedUser
            }),
          },
        }
      })
    }
  }

  return {
    getGroupMembers: {
      getMembersCalled,
      getMembersLoading,
      getMembersError,
      getMembersData,
      updateQuery,
    },
    loadMembers,
    updateUsersCache,
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
    handleCheckBoxChange,
    refetch,
  }
}
