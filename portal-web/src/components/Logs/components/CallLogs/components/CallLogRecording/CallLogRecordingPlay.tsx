/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Paper from "@material-ui/core/Paper"
import Spinner from "react-spinkit"
import Button from "@material-ui/core/Button"
import { PortalDialogTitle } from "../../../../../shared"
import { DownloadIcon } from "../../../../../shared/Images"
import { CallLogStreamPlayer } from "./CallLogStreamPlayer"
import styles from "./CallLogRecording.module.scss"
import { useCallLogRecordingPlay } from "./useCallLogRecordingPlay"

type ownProps = {
  recordingUuid: string
  handleClose: () => void
}

export const CallLogRecordingPlay: React.FC<ownProps> = ({
  handleClose,
  recordingUuid,
}) => {
  const {
    handleDownloadRecording,
    state,
    handleCallLogRecordingType,
  } = useCallLogRecordingPlay({ recordingUuid })

  const { isRecordingLoading, audioUrl, audioExtension } = state

  return (
    <Paper>
      <Dialog
        open
        onClose={handleClose}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg">
        <PortalDialogTitle
          title="Listen to the  audio recording"
          closeDialog={handleClose}
        />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className={styles.recordingPlayerContainer}>
              <CallLogStreamPlayer audioUrl={audioUrl} />
              {isRecordingLoading && (
                <Spinner
                  name="ball-beat"
                  className={styles.fileDownloadSpinner}
                />
              )}
              {!isRecordingLoading && (
                <div className={styles.recordingDownloadContainer}>
                  <Button
                    color="primary"
                    onClick={handleDownloadRecording}
                    className={styles.linkToRecording}>
                    <DownloadIcon />
                  </Button>
                  <select
                    value={audioExtension}
                    onChange={handleCallLogRecordingType}>
                    {["mp3", "wav"].map(type => (
                      <option value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </Paper>
  )
}
