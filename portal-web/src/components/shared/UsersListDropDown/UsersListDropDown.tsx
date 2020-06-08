import React, { useState } from "react"
import FormControl from "@material-ui/core/FormControl"
import { useQuery } from "@apollo/react-hooks"
import Select from "react-select"
import { IUser } from "../../Users/User.type"
import { GET_ALL_USERS } from "../../Users/UserQueries"

type labelOption = {
  value: number
  label: string
}

const buildOptions = (users: IUser[]): labelOption[] => {
  return users.map(user => ({
    value: user.userId,
    label: `${user.firstName} ${user.lastName} (Ext: ${user.sipExtension})`,
  }))
}

type classes = {
  formControl: any
  formLabel: any
  formSelect: any
}

interface IOwnProps {
  handleUserChange: (e: any) => void
  classes?: Partial<classes>
  usersLoaded: () => void
}

export const UsersListDropDown: React.FC<IOwnProps> = React.memo(
  ({ handleUserChange, classes, usersLoaded }) => {
    const [userOptions, setUserOptions] = useState<labelOption[] | null>(null)
    const [userOption, setUserOption] = useState<labelOption | null>(null)

    const { loading: userLoading } = useQuery(GET_ALL_USERS, {
      onCompleted(data) {
        setUserOptions(buildOptions(data.users))
        usersLoaded()
      },
    })

    return (
      <>
        {userLoading && <div>Loading users...</div>}
        {!userLoading && userOptions && (
          <FormControl
            margin="normal"
            className={
              classes && classes.formControl ? classes.formControl : ""
            }>
            <span
              className={classes && classes.formLabel ? classes.formLabel : ""}>
              From(User)
            </span>
            <Select
              value={userOption}
              onChange={(e: any) => {
                setUserOption(e)
                handleUserChange(e)
              }}
              isClearable
              options={userOptions}
              className={
                classes && classes.formSelect ? classes.formSelect : ""
              }
            />
          </FormControl>
        )}
      </>
    )
  },
)
