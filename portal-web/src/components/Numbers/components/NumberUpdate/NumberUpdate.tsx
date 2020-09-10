import React from "react"

import { isNil } from "ramda"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import FormGroup from "@material-ui/core/FormGroup"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import { INumber } from "../Number.type"

import {
  ErrorSnack,
  PortalDialogTitle,
  UsersListDropDown,
} from "../../../shared"
import styles from "../Numbers.module.scss"
import { useNumberUpdateHook } from "./useNumberUpdateHook"
import DeleteNumberDialogBox from "./DeleteNumberDialogBox"

type OwnProps = {
  closeDialog: () => void
  number: INumber
  refetchNumbers: () => void
}

export const NumberUpdate = ({
  closeDialog,
  number,
  refetchNumbers,
}: OwnProps) => {
  const {
    cantDelete,
    error,
    errorSnack,
    setErrorSnack,
    submitHandler,
    usersDropdown,
    handleUserChange,
    handleUsersLoaded,
    reloadUsers,
    label,
    handleOnLabelChange,
    numberUpdateLoading,
    usersLoading,
    updatedNumberData,
    numberDeleteLoading,
    promptDeleteConfirmDialog,
    showDeleteConfirmDialog,
    showMessageDialog,
    deleteSuccessMessage,
    dismissDeleteConfirmDialog,
    handleDeleteNumber,
    handleCloseMessageDialog,
  } = useNumberUpdateHook({
    closeDialog,
    number,
    refetchNumbers,
  })

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
                  {usersDropdown && (
                    <UsersListDropDown
                      handleUserChange={handleUserChange}
                      usersLoaded={handleUsersLoaded}
                      reLoad={reloadUsers}
                      defaultUserId={number.userId!}
                    />
                  )}
                  <FormControl margin="normal">
                    <TextValidator
                      label="Label"
                      name="label"
                      class="standard-basic"
                      value={label}
                      onChange={handleOnLabelChange}
                      InputProps={{
                        className: styles.textControl,
                      }}
                      validators={["required"]}
                      errorMessages={["This field is required."]}
                    />
                  </FormControl>
                  <div className={styles.headerButtonPanel}>
                    <div>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={numberUpdateLoading || usersLoading}
                        className={styles.submitButton}>
                        {numberUpdateLoading ? "Updating" : "Update"}
                      </Button>{" "}
                      {!isNil(updatedNumberData) && "Number has been assigned"}
                    </div>
                    <Button
                      type="button"
                      onClick={promptDeleteConfirmDialog}
                      disabled={cantDelete || numberDeleteLoading}
                      className={styles.formButton}>
                      {numberDeleteLoading
                        ? "Deleting Number"
                        : "Delete Number"}
                    </Button>
                  </div>
                  <DeleteNumberDialogBox
                    showDeleteConfirmDialog={showDeleteConfirmDialog}
                    dismissDeleteConfirmDialog={dismissDeleteConfirmDialog}
                    handleDeleteNumber={handleDeleteNumber}
                    showMessageDialog={showMessageDialog}
                    handleCloseMessageDialog={handleCloseMessageDialog}
                    deleteSuccessMessage={deleteSuccessMessage}
                  />
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
