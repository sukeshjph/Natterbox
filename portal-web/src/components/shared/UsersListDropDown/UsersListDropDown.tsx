import React, { useState, useEffect } from "react"
import FormControl from "@material-ui/core/FormControl"
import { useLazyQuery } from "@apollo/react-hooks"
import Select from "react-select"
import { GET_ALL_USERS } from "../../Users/UserQueries"

type labelOption = {
  value: number
  label: string
}

type classes = {
  formControl: any
  formLabel: any
  formSelect: any
}

const buildOptions = (users: IUser[]): labelOption[] =>
  users.map(({ userId, firstName, lastName, sipExtension }) => ({
    value: userId,
    label: `${firstName} ${lastName} (Ext: ${sipExtension})`,
  }))

interface IOwnProps {
  users?: IUser[]
  loadLocalUsers?: boolean
  handleUserChange: (e: any) => void
  classes?: Partial<classes>
  usersLoaded?: () => void
  loadingComp?: React.ReactNode
  reLoad?: any
  showLabel?: boolean
  userLabel?: string
  defaultUserId?: number
  isMulti?: boolean
  customStyles?: any
}

export const UsersListDropDown: React.FC<IOwnProps> = React.memo(props => {
  const {
    handleUserChange,
    classes,
    usersLoaded,
    loadingComp,
    showLabel = true,
    userLabel,
    reLoad,
    defaultUserId,
    isMulti = false,
    customStyles,
    users,
    loadLocalUsers = true,
  } = props

  const [userOptions, setUserOptions] = useState<labelOption[] | null>(null)
  const [userOption, setUserOption] = useState<labelOption | null>(null)
  const [allUsers, setAllUsers] = useState<IUser[]>([])

  const selectStyles = {
    menu: provided => ({
      ...provided,
      zIndex: 3,
    }),
    ...customStyles,
  }

  const handleLocalUserData = (userData: IUser[]) => {
    setUserOptions(buildOptions(userData))
    setAllUsers(userData)

    if (defaultUserId) {
      const defaultUser = userData.find(user => user.userId === defaultUserId)

      if (defaultUser) {
        setUserOption({
          value: defaultUserId,
          label: `${defaultUser.firstName} ${defaultUser.lastName} (Ext: ${defaultUser.sipExtension})`,
        })
      }
    }
  }

  const [loadUsers, { loading: userLoading, refetch }] = useLazyQuery(
    GET_ALL_USERS,
    {
      onCompleted(data) {
        handleLocalUserData(data.users)
        if (usersLoaded) {
          usersLoaded()
        }
      },
    },
  )

  useEffect(() => {
    if (loadLocalUsers) {
      if (refetch) {
        refetch()
      }
    }
  }, [reLoad])

  useEffect(() => {
    if (loadLocalUsers) {
      loadUsers()
    } else if (users && users.length !== 0) {
      handleLocalUserData(users)
    }
  }, [])

  const getLoadingComp = () => {
    if (loadingComp) {
      return <>{loadingComp}</>
    }
    return <div>Loading users...</div>
  }

  const handleFilterOption = (option, inputValue) => {
    const { value } = option

    if (inputValue) {
      const foundUser = allUsers.find(user => user.userId === value)

      if (foundUser) {
        const { firstName, lastName, sipExtension } = foundUser
        let match = false

        const splitInput = inputValue.split(" ")

        if (firstName) {
          if (splitInput[0]) {
            match = firstName
              .toUpperCase()
              .startsWith(splitInput[0].toUpperCase())
          }
        }

        if (lastName) {
          if (splitInput[1]) {
            match =
              match &&
              lastName.toUpperCase().startsWith(splitInput[1].toUpperCase())
          }
        }

        if (sipExtension) {
          if (splitInput[2]) {
            match =
              match &&
              sipExtension.toUpperCase().startsWith(splitInput[2].toUpperCase())
          }
        }

        return match
      }

      return false
    }

    return true
  }

  return (
    <>
      {userLoading && getLoadingComp()}
      {!userLoading && userOptions && (
        <FormControl
          margin="normal"
          className={classes && classes.formControl ? classes.formControl : ""}>
          {showLabel && (
            <span
              className={classes && classes.formLabel ? classes.formLabel : ""}>
              {userLabel || "From(User)"}
            </span>
          )}
          <Select
            value={userOption}
            filterOption={handleFilterOption}
            isMulti={isMulti}
            styles={selectStyles}
            onChange={(e: any) => {
              setUserOption(e)
              handleUserChange(e)
            }}
            isClearable
            options={userOptions}
            className={classes && classes.formSelect ? classes.formSelect : ""}
          />
        </FormControl>
      )}
      {!userLoading && userOptions && userOptions.length === 0 && (
        <Select
          styles={selectStyles}
          className={classes && classes.formSelect ? classes.formSelect : ""}
        />
      )}
    </>
  )
})
