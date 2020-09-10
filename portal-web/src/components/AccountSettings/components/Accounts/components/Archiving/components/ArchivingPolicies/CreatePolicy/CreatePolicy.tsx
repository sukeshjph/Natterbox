import React from "react"
// import FormControl from "@material-ui/core/FormControl"
// import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import { PortalDialogTitle } from "components/shared"
import { useCreatePolicyHook } from "./useCreatePolicyHook"

import styles from "./CreatePolicy.module.scss"

type OwnProps = {
  closeDialog: () => void
  refetch: () => void
}

export const CreatePolicy: React.FC<OwnProps> = ({ closeDialog }) => {
  const { state } = useCreatePolicyHook()
  const {
    createPolicy: { Name, Description, StorageEndpointID, Mode, RetentionMax },
  } = state

  const getNameRow = () => (
    <>
      <TextValidator
        InputLabelProps={{ shrink: true }}
        className={styles.formControl}
        name="name"
        label="Name"
        value={Name.Value}
        InputProps={{
          className: styles.textControl,
        }}
        validators={["required"]}
        errorMessages={["Name is required"]}
      />
      <TextValidator
        id="outlined-multiline-static"
        className={styles.formControl}
        InputLabelProps={{ shrink: true }}
        name="description"
        label="Description"
        multiline
        rows={4}
        value={Description.Value}
        InputProps={{
          className: styles.textControl,
        }}
      />
    </>
  )

  return (
    <Paper>
      <Dialog
        open
        onClose={closeDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md">
        <PortalDialogTitle title="Create Policy" closeDialog={closeDialog} />
        <DialogContent>
          <div className={styles.createPolicyContainer}>
            <ValidatorForm onSubmit={() => undefined} autoComplete="off">
              <FormGroup>
                <div className={`${styles.nameRow} ${styles.row}`}>
                  {getNameRow()}
                </div>
                <div className={styles.row}>
                  <div className={styles.subHeading}>Retention Policy</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.retentionColumn}>
                    <FormControl className={`${styles.formControl}`}>
                      <InputLabel id="endpoint-select" shrink>
                        Endpoint
                      </InputLabel>
                      <Select
                        labelId="endpoint-select"
                        id="endpoint-select-id"
                        label="EndPoint"
                        value={StorageEndpointID.Value}>
                        <MenuItem value="ADMINISTRATOR">ADMINISTRATOR</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.retentionColumn}>
                    <FormControl className={`${styles.formControl}`}>
                      <InputLabel id="mode-select" shrink>
                        Mode
                      </InputLabel>
                      <Select
                        labelId="mode-select"
                        id="mode-select-id"
                        label="Mode"
                        value={Mode.Value}>
                        <MenuItem value="BASIC">Loose</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.retentionColumn}>
                    <FormControl className={`${styles.formControl}`}>
                      <InputLabel id="min-select" shrink>
                        Minimum Retention
                      </InputLabel>
                      <Select
                        labelId="min-select"
                        id="min-select-id"
                        label="Minimum Retention"
                        value={RetentionMax.Value}>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.retentionColumn}>
                    <FormControl className={`${styles.formControl}`}>
                      <Select
                        labelId="min-days-select"
                        id="min-days-select-id"
                        label="Minimum Retention Days"
                        value={RetentionMax.Unit}>
                        <MenuItem value="days">days</MenuItem>
                        <MenuItem value="weeks">weeks</MenuItem>
                        <MenuItem value="months">months</MenuItem>
                        <MenuItem value="months">years</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className={styles.row} />
                <div className={styles.row} />
              </FormGroup>
            </ValidatorForm>
          </div>
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
