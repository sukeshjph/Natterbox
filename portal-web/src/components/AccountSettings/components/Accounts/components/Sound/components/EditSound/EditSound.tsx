import React from "react"
import FormControl from "@material-ui/core/FormControl"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import { PortalDialogTitle, ErrorSnack, MessageSnack } from "components/shared"
import { useEditSoundHook } from "./useEditSoundHook"
import { DeleteDialog } from "./DeleteDialog"
import { ISound } from "../../Sound.type"

import styles from "./EditSound.module.scss"

type OwnProps = {
  closeDialog: () => void
  refetch: () => void
  currentSound: Pick<ISound, "id" | "tag" | "description">
}

export const EditSound: React.FC<OwnProps> = ({
  closeDialog,
  currentSound,
  refetch,
}) => {
  const {
    state,
    handleSoundFilDownload,
    updateField,
    clearSuccessMessage,
    handleRemoveError,
    handleSoundFileUpdate,
    handleDeleteDialog,
    handleDeleteSound,
  } = useEditSoundHook({ currentSound, refetch, closeDialog })

  const {
    tag,
    description,
    downloadingSoundFile,
    uploadedFilePath,
    error,
    showError,
    successMessage,
    updatingSoundFile,
    deletingSound,
    showDeleteDialog,
  } = state

  const formDisabled = downloadingSoundFile || updatingSoundFile

  return (
    <Paper>
      {error && (
        <ErrorSnack
          error={error}
          open={!!error && showError}
          handleClose={handleRemoveError}
        />
      )}
      {successMessage && (
        <MessageSnack
          message={successMessage}
          open={!!successMessage}
          handleClose={clearSuccessMessage}
        />
      )}
      {showDeleteDialog && (
        <DeleteDialog
          showDeleteDialog={showDeleteDialog}
          closeDialog={() => handleDeleteDialog(false)}
          handleDeleteSound={handleDeleteSound}
        />
      )}
      <Dialog
        open
        onClose={closeDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md">
        <PortalDialogTitle title="Edit Sound" closeDialog={closeDialog} />
        <DialogContent>
          <div className={styles.editSoundContainer}>
            <ValidatorForm onSubmit={() => undefined} autoComplete="off">
              <FormGroup>
                <div className={styles.row}>
                  <div className={`${styles.soundSubHeading} ${styles.column}`}>
                    Sound Name
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.leftColumn}>
                    <FormControl>
                      <TextValidator
                        className={styles.formControl}
                        InputLabelProps={{ shrink: true }}
                        name="tag"
                        label="Tag"
                        onChange={updateField("tag")}
                        value={tag}
                        disabled={formDisabled}
                        InputProps={{
                          className: styles.textControl,
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className={styles.rightColumn}>
                    <Button
                      size="medium"
                      className={styles.downloadButton}
                      onClick={() => handleSoundFilDownload()}>
                      {downloadingSoundFile ? "Downloading" : "Download"}
                    </Button>
                  </div>
                </div>
                <p>
                  You can use this sound inside a speech dialog by using
                  <br /> the token {`{${tag}}`}
                </p>
                <div className={styles.row}>
                  <div className={`${styles.soundSubHeading} ${styles.column}`}>
                    Sound Settings
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.leftColumn}>
                    <FormControl>
                      <TextValidator
                        className={styles.formControl}
                        InputLabelProps={{ shrink: true }}
                        name="description"
                        label="Description"
                        onChange={updateField("description")}
                        value={description}
                        disabled={formDisabled}
                        InputProps={{
                          className: styles.textControl,
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className={styles.rightColumn} />
                </div>

                <div className={styles.row}>
                  <div className={styles.leftColumn}>
                    <FormControl>
                      <TextValidator
                        className={styles.formControl}
                        InputLabelProps={{ shrink: true }}
                        name="uploadedFile"
                        label="Upload"
                        onChange={updateField("uploadedFile")}
                        value={uploadedFilePath}
                        InputProps={{
                          className: styles.textControl,
                          type: "file",
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className={styles.rightColumn} />
                </div>

                <div className={styles.row}>
                  <Button
                    size="medium"
                    className={styles.cancelButton}
                    disabled={formDisabled}
                    onClick={() => closeDialog()}>
                    Cancel
                  </Button>
                  <Button
                    size="medium"
                    className={styles.uploadButton}
                    disabled={formDisabled}
                    onClick={handleSoundFileUpdate}>
                    {updatingSoundFile ? "Saving" : "Save"}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => handleDeleteDialog(true)}
                    disabled={formDisabled}
                    className={styles.deleteButton}>
                    {deletingSound ? "Deleting" : "Delete Sound"}
                  </Button>
                </div>
              </FormGroup>
            </ValidatorForm>
          </div>
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
