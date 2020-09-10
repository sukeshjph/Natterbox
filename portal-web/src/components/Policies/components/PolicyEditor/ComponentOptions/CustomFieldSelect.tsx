import TextField from "@material-ui/core/TextField/TextField"
import { MenuItem } from "@material-ui/core"
import React from "react"
import styles from "./ComponentOptions.module.scss"
import { camelToSentenceCase } from "../../../../shared/String/helpers"

export const CustomFieldSelect = props => {
  const { id, label, value, required, options, description } = props
  const { enumOptions } = options
  return (
    <TextField
      id={id}
      select
      label={label}
      value={value}
      required={required}
      onChange={event => props.onChange(event.target.value)}
      helperText={description}
      InputProps={{
        className: styles.dropdownControl,
      }}
      variant="outlined">
      {enumOptions.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {camelToSentenceCase(option.label)}
        </MenuItem>
      ))}
    </TextField>
  )
}
