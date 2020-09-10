import React from "react"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-lua"
import "ace-builds/src-noconflict/theme-github"
import styles from "./ComponentOptions.module.scss"

export const CustomFieldScript = props => {
  const { id, label, value } = props
  return (
    <div>
      {label}
      <AceEditor
        className={styles.scriptContainer}
        width="365px"
        height="400px"
        mode="lua"
        theme="github"
        value={value !== null ? value : undefined}
        name={id}
        onChange={event => props.onChange(event)}
        setOptions={{
          useWorker: false,
        }}
      />
    </div>
  )
}
