import React, { useState, useEffect } from "react"
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import { isNil } from "ramda"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Select from "react-select"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import FormGroup from "@material-ui/core/FormGroup"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import { GET_ALL_USERS } from "../../../Users/UserQueries"
import { UPDATE_NUMBER } from "../NumberQueries"
import { INumber } from "../Number.type"
import { IUser } from "../../../Users/User.type"
import { ErrorSnack, PortalDialogTitle } from "../../../shared"
import styles from "../Numbers.module.scss"

type OwnProps = {
  closeDialog: () => void
  number: INumber
  refetchNumbers: () => void
}

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

export const NumberUpdate = ({
  closeDialog,
  number,
  refetchNumbers,
}: OwnProps) => {
  const [
    loadUsers,
    { loading: usersLoading, error, data: userData },
  ] = useLazyQuery(GET_ALL_USERS)
  const [label, setLabel] = useState<string | null>(null)
  const [userOptions, setUserOptions] = useState<labelOption[] | null>(null)
  const [userOption, setUserOption] = useState<labelOption | null>(null)
  const [errorSnack, setErrorSnack] = useState(false)

  const [
    updateNumber,
    { loading: numberUpdateLoading, data: updatedNumberData },
  ] = useMutation(UPDATE_NUMBER, {
    onCompleted() {
      refetchNumbers()
    },
  })

  const runDataUpdate = () => {
    // if policyId not present then loadUsers
    if (isNil(number.policyId)) loadUsers()
    if (!isNil(number.label)) setLabel(number.label)
  }

  useEffect(() => {
    runDataUpdate()
  }, []) // first pageload

  useEffect(() => {
    runDataUpdate()
  }, [number]) // whenever number is updated

  useEffect(() => {
    if (!usersLoading && userData) {
      // set select options
      setUserOptions(buildOptions(userData.users))

      // set the default select option if possible
      if (!isNil(number) && !isNil(number.userId)) {
        const item = (userData.users as IUser[]).find(
          user => number.userId === user.userId,
        )
        if (item) {
          setUserOption({
            value: number.userId,
            label: `${item.firstName} ${item.lastName} (Ext: ${item.sipExtension})`,
          })
        }
      }
    }
  }, [usersLoading, userData, error])

  // Send Mutation to API
  const submitHandler = () => {
    updateNumber({
      variables: {
        id: number.number,
        number: {
          label,
          userId: userOption && userOption.value,
        },
      },
    }).catch(() => {})
  }

  // Create Label field
  // validation for label field

  return (
    <Paper>
      {error && (
        <ErrorSnack
          error={error!.message}
          open={error! && !errorSnack}
          handleClose={() => setErrorSnack(true)}
        />
      )}
      {!error && (
        <Dialog
          open
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md">
          <PortalDialogTitle
            title="View/Update Number"
            closeDialog={closeDialog}
          />
          <DialogContent>
            <DialogContentText id="number-update-dialog-text">
              <ValidatorForm
                onSubmit={submitHandler}
                autoComplete="off"
                className={styles.formValidator}>
                <FormGroup>
                  {usersLoading && <div>Loading users...</div>}
                  {!usersLoading && userOptions && (
                    <FormControl margin="normal">
                      <Select
                        value={userOption}
                        onChange={(value: any) => setUserOption(value || null)}
                        isClearable
                        options={userOptions}
                        className={styles.userSelect}
                      />
                    </FormControl>
                  )}

                  <FormControl margin="normal">
                    <TextValidator
                      label="Label"
                      name="label"
                      class="standard-basic"
                      value={label}
                      onChange={(e: any) => setLabel(e.target.value)}
                      InputProps={{
                        className: styles.textControl,
                      }}
                      validators={["required"]}
                      errorMessages={["This field is required."]}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={numberUpdateLoading || usersLoading}
                    className={styles.submitButton}>
                    {numberUpdateLoading ? "Updating" : "Update"}
                  </Button>
                  {!isNil(updatedNumberData) && "Number has been assigned"}
                </FormGroup>
              </ValidatorForm>
            </DialogContentText>
          </DialogContent>
          <DialogActions />
        </Dialog>
      )}
    </Paper>
  )
}
