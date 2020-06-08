import React, { useState, useRef } from "react"
import { Base64 } from "js-base64"
import Alert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import CloseIcon from "@material-ui/icons/Close"
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn"
import { useAuth0 } from "../../../plugins/auth0"

import styles from "./MePage.module.scss"

export const Me = () => {
  const [copyAlert, setCopyAlertOpen] = useState(false)
  const { userToken } = useAuth0()
  const s = userToken?.split(".")
  const details = s && Base64.decode(s[1])
  const data = details && JSON.parse(details)

  const inputEl = useRef<HTMLInputElement>(null)

  const copyToClipboard = () => {
    if (inputEl && inputEl.current) inputEl.current.select()
    document.execCommand("copy")
    setCopyAlertOpen(true)
    setTimeout(() => setCopyAlertOpen(false), 2000)
  }
  return (
    <div className={styles.container}>
      <h2>JWT TOKEN:</h2>
      <hr />
      <FormGroup>
        <FormControl margin="normal">
          <TextField
            inputRef={inputEl}
            id="jwtToken"
            name="jwtToken"
            label="Token"
            variant="outlined"
            multiline
            rowsMax={4}
            value={userToken}
          />
        </FormControl>
        <Button
          className={styles.copyButton}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AssignmentReturnIcon />}
          onClick={copyToClipboard}>
          Copy to clipboard
        </Button>
        <Collapse in={copyAlert} className={styles.copyButtonAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setCopyAlertOpen(false)
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            Copy successful!
          </Alert>
        </Collapse>
      </FormGroup>
      <h3>Payload:</h3>
      {Object.keys(data).map(key => {
        return <div key={key}>{`${key} : ${data[key]}`}</div>
      })}
    </div>
  )
}
