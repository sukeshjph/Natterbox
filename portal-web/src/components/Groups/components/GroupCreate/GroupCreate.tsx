import React from "react"
import { isNil } from "ramda"
import Spinner from "react-spinkit"
import FormControl from "@material-ui/core/FormControl"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Paper from "@material-ui/core/Paper"
import InputLabel from "@material-ui/core/InputLabel"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { ErrorSnack, Loading, PortalDialogTitle } from "../../../shared"
import { LightTooltip } from "../../../shared/LightTooltip/LightTooltip"
import styles from "../Groups.module.scss"
import useGroupCreateHook from "./useGroupCreateHook"
import { GroupCreateState } from "../Groups.type"

type OwnProps = {
  closeDialog: () => void
}

export const GroupCreate = ({ closeDialog }: OwnProps) => {
  const {
    mutationLoading,
    createdGroupData,
    getAllGroupsCalled,
    getAllGroupsLoading,
    getGroupsError,
    state: { groupState, errorSnack, categoryDropdown, categories },
    updateField,
    submitHandler,
    handleSubmit,
    handleErrorClose,
  } = useGroupCreateHook(closeDialog)

  const {
    sipExtension,
    name,
    emailAddress,
    category,
  } = groupState as GroupCreateState

  const formDisabled = mutationLoading

  return (
    <Paper>
      {getAllGroupsCalled && getAllGroupsLoading && (
        <Loading spinner={<Spinner name="line-scale" />} />
      )}
      {getGroupsError && (
        <ErrorSnack
          error={getGroupsError!.message}
          open={getGroupsError! && !errorSnack}
          handleClose={handleErrorClose}
        />
      )}
      <Dialog
        open
        onClose={closeDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md">
        <PortalDialogTitle title="Create Group" closeDialog={closeDialog} />
        <DialogContent>
          <ValidatorForm
            onSubmit={submitHandler}
            autoComplete="off"
            className={styles.formValidator}>
            <FormGroup>
              {/*  Name = name */}
              <FormControl margin="normal">
                <TextValidator
                  InputLabelProps={{ shrink: true }}
                  name="name"
                  label="Name"
                  onChange={updateField}
                  value={name}
                  disabled={formDisabled}
                  validators={["required"]}
                  errorMessages={["Name is required"]}
                  InputProps={{
                    className: styles.textControl,
                  }}
                />
              </FormControl>
              <FormGroup className={styles.formGroupInline}>
                {/*  Category = category */}
                <FormControl margin="normal">
                  <TextValidator
                    InputLabelProps={{ shrink: true }}
                    name="category"
                    label="Category"
                    onChange={updateField}
                    value={category}
                    disabled={formDisabled}
                    validators={["required"]}
                    errorMessages={["Category is required"]}
                    InputProps={{
                      className: styles.textControl,
                    }}
                  />
                </FormControl>
                {/*  Select = select */}
                <FormControl
                  margin="normal"
                  className={styles.formControlInline}>
                  <InputLabel id="select-label">Categories</InputLabel>
                  <Select
                    labelId="select-label"
                    id="page-select-id"
                    name="category"
                    className={styles.pageSizeDropdown}
                    onChange={updateField}
                    value={categoryDropdown}>
                    {categories.map(options => (
                      <MenuItem value={options}>{options}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
              {/*  Email Address = emailAddress */}
              <FormControl margin="normal">
                <TextValidator
                  InputLabelProps={{ shrink: true }}
                  name="emailAddress"
                  label="Email Address"
                  onChange={updateField}
                  value={emailAddress}
                  disabled={formDisabled}
                  InputProps={{
                    className: styles.textControl,
                  }}
                  validators={["isEmail", "required"]}
                  errorMessages={["Email is not valid", "Email is required"]}
                />
              </FormControl>
              {/*  Extension = sipExtension */}

              {/*  Address = sipExtension */}
              <FormControl margin="normal">
                <LightTooltip title="Must be within the range of 2000-7999">
                  <TextValidator
                    InputLabelProps={{ shrink: true }}
                    class="standard-basic"
                    name="sipExtension"
                    value={isNil(sipExtension) ? "" : sipExtension}
                    label="Address"
                    onChange={updateField}
                    disabled={sipExtension === null || formDisabled}
                    InputProps={{
                      className: styles.textControl,
                    }}
                    validators={[
                      "minNumber:2000",
                      "maxNumber:7999",
                      "isNumber",
                      "required",
                    ]}
                    errorMessages={[
                      "Number must be above 2000.",
                      "Number must be below 7999.",
                      "Must contain only numerical characters.",
                      "sipExtension is required",
                    ]}
                    data-testid="sip-address"
                  />
                </LightTooltip>
              </FormControl>
              <FormGroup className={styles.formGroupInline}>
                <FormControl margin="normal">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    data-testid="groupSaveCreate"
                    disabled={formDisabled}
                    className={styles.GroupButton}
                    onMouseDown={() => handleSubmit(1)}>
                    {mutationLoading ? "Creating" : "Save & Create Another"}
                  </Button>
                </FormControl>
                <FormControl margin="normal">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={formDisabled}
                    className={styles.GroupButtonInline}
                    onMouseDown={() => handleSubmit(2)}>
                    {mutationLoading ? "Creating" : "Save & Close"}
                  </Button>
                </FormControl>
              </FormGroup>
              {!isNil(createdGroupData) && "Updated the Group successfully"}
            </FormGroup>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
