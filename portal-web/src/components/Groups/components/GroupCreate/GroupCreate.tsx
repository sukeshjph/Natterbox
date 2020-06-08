import React, { useState } from "react"
import { isNil, pluck, uniq } from "ramda"
import Spinner from "react-spinkit"
import { useMutation, useQuery } from "@apollo/react-hooks"
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
import { IGroup } from "../Groups.type"
import { CREATE_GROUP, GET_ALL_GROUPS } from "../GroupsQueries"

type GroupState = Pick<
  IGroup,
  "sipExtension" | "name" | "emailAddress" | "pin" | "category" | "members"
>

const GroupInitialState = {
  sipExtension: "",
  name: "",
  emailAddress: "",
  category: "",
  members: {},
}
type OwnProps = {
  closeDialog: () => void
}

export const GroupCreate = ({ closeDialog }: OwnProps) => {
  const [categoryDropdown] = useState("")
  const [errorSnack, setErrorSnack] = useState(false)

  const [GroupState, setGroupState] = useState<GroupState>(GroupInitialState)
  const [submitType, setSubmitType] = useState(1)
  const [categories, setCategories] = useState([])

  const { called, loading, error, data } = useQuery(GET_ALL_GROUPS, {
    onCompleted() {
      if (data) {
        const getCategory = pluck("category")
        setCategories(uniq(getCategory(data.groups)))
      }
    },
  })

  const [
    createGroup,
    { loading: mutationLoading, data: createdGroupData },
  ] = useMutation(CREATE_GROUP, {
    onCompleted() {
      // TODO: EITHER CLOSE THE MODAL OR WIPE DATA CLEAR
      if (submitType === 1) {
        // CLEAR DATA
        setGroupState(GroupInitialState)
      } else if (submitType === 2) {
        setGroupState(GroupInitialState)
        closeDialog()
      }
    },
  })

  // Update the Field
  const updateField = e => {
    if (e.target.type === "checkbox")
      setGroupState({
        ...GroupState,
        [e.target.name]: e.target.checked,
      })

    setGroupState({
      ...GroupState,
      [e.target.name]: e.target.value === "" ? null : e.target.value,
    })
  }

  // Send Mutation to API
  const submitHandler = () => {
    const group = {
      ...GroupState,
    }

    createGroup({
      variables: {
        group,
      },
    }).catch(() => {})
  }

  const { sipExtension, name, emailAddress, category } = GroupState

  const formDisabled = mutationLoading

  const handleSubmit = type => {
    setSubmitType(type)
  }

  return (
    <Paper>
      {called && loading && <Loading spinner={<Spinner name="line-scale" />} />}
      {error && (
        <ErrorSnack
          error={error!.message}
          open={error! && !errorSnack}
          handleClose={() => setErrorSnack(true)}
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
                    disabled={GroupState.sipExtension === null || formDisabled}
                    InputProps={{
                      className: styles.textControl,
                    }}
                    validators={[
                      "minNumber:2000",
                      "maxNumber:7999",
                      "isNumber",
                    ]}
                    errorMessages={[
                      "Number must be above 2000.",
                      "Number must be below 7999.",
                      "Must contain only numerical characters.",
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
