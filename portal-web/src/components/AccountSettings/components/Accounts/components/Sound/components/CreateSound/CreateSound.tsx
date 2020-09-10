import React from "react"
import FormControl from "@material-ui/core/FormControl"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import { PortalDialogTitle, ErrorSnack } from "components/shared"
import { useCreateSoundHook } from "./useCreateSoundHook"

import styles from "./CreateSound.module.scss"

type OwnProps = {
  closeDialog: () => void
  refetch: () => void
}

export const CreateSound: React.FC<OwnProps> = ({ closeDialog, refetch }) => {
  const {
    state,
    updateField,
    handleWavUpload,
    handleRemoveError,
  } = useCreateSoundHook({
    refetch,
    closeDialog,
  })
  const { tag, description, filePath, uploadingFile, error, showError } = state

  return (
    <Paper>
      {error && (
        <ErrorSnack
          error={error}
          open={!!error && showError}
          handleClose={handleRemoveError}
        />
      )}

      <Dialog
        open
        onClose={closeDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md">
        <PortalDialogTitle title="Create Sound" closeDialog={closeDialog} />
        <DialogContent>
          <div className={styles.createSoundContainer}>
            <ValidatorForm onSubmit={() => undefined} autoComplete="off">
              <FormGroup>
                <span className={styles.soundSubHeading}>Sound Name</span>
                <FormControl>
                  <TextValidator
                    className={styles.formControl}
                    InputLabelProps={{ shrink: true }}
                    name="tag"
                    label="Tag"
                    disabled={uploadingFile}
                    value={tag}
                    onChange={updateField("tag")}
                    InputProps={{
                      className: styles.textControl,
                    }}
                  />
                </FormControl>
                <p>
                  You can use this sound inside a<br /> speech dialog by using
                  the token <br />
                  {`{${tag}}`}
                </p>
                <span className={styles.soundSubHeading}>Sound Settings</span>
                <FormControl>
                  <TextValidator
                    className={styles.formControl}
                    InputLabelProps={{ shrink: true }}
                    name="description"
                    label="Description"
                    value={description}
                    disabled={uploadingFile}
                    onChange={updateField("description")}
                    InputProps={{
                      className: styles.textControl,
                    }}
                  />
                </FormControl>
                <FormControl>
                  <TextValidator
                    className={styles.formControl}
                    InputLabelProps={{ shrink: true }}
                    name="file"
                    label="File"
                    value={filePath}
                    disabled={uploadingFile}
                    onChange={updateField("file")}
                    InputProps={{
                      className: styles.textControl,
                      type: "file",
                    }}
                  />
                </FormControl>

                <Button
                  size="medium"
                  className={styles.uploadButton}
                  onClick={handleWavUpload}
                  disabled={uploadingFile}>
                  {uploadingFile ? "Uploading" : "Upload"}
                </Button>
              </FormGroup>
            </ValidatorForm>
          </div>
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
