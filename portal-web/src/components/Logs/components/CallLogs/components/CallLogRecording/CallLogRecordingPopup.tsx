/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react"
import { keys } from "ramda"
import { Tooltip } from "react-tippy"
import "react-tippy/dist/tippy.css"
import Button from "@material-ui/core/Button"
import { PauseIcon } from "../../../../../shared/Images"
import { CallLogRecordingPlay } from "./CallLogRecordingPlay"
import styles from "./CallLogRecording.module.scss"

interface IRecordingType {
  aUuid: string
  bUuid: string
}

type ownProps = {
  recordings: IRecordingType
}

export const CallLogRecordingPopup: React.FC<ownProps> = ({ recordings }) => {
  const [recordingDialog, setRecordingDialog] = useState(false)
  const [recordingUuid, setRecordingUuid] = useState("")

  if (Object.keys(recordings).length === 0) return null

  const handleRecordingClick = recordindId => event => {
    event.preventDefault()
    setRecordingUuid(recordindId)
    setRecordingDialog(true)
    return false
  }

  const getRecordingHTML = () => {
    return (
      <>
        {keys(recordings).length > 1 && (
          <p className={styles.recordingTooltipText}>
            There are multiple recording associated with this call, please
            choose from options below
          </p>
        )}
        {keys(recordings).map(recordingKey => (
          <div className={styles.recordingToolTip}>
            <PauseIcon />
            <Button
              color="primary"
              className={styles.linkToRecording}
              onClick={handleRecordingClick(recordings[recordingKey])}>
              Listen to the recording {recordingKey.slice(0, 1).toUpperCase()}
            </Button>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {recordingDialog && (
        <CallLogRecordingPlay
          recordingUuid={recordingUuid}
          handleClose={() => setRecordingDialog(false)}
        />
      )}
      <div className={styles.callRecordingMain}>
        <PauseIcon />
        <Tooltip
          html={getRecordingHTML()}
          arrow
          position="bottom"
          theme="light"
          delay={400}
          inertia
          interactive
          hideDelay={1000}>
          <Button
            color="primary"
            onClick={() => false}
            className={styles.linkToRecording}>
            LISTEN
          </Button>
        </Tooltip>
      </div>
    </>
  )
}
