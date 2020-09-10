import TextField from "@material-ui/core/TextField/TextField"
import React from "react"
import styles from "./ComponentOptions.module.scss"

export const CustomFieldText = props => {
  const { id, value, required, label, schema, defaultValue } = props

  const { type } = schema
  let typeToCheck = type
  if (Array.isArray(type)) {
    const index = type.findIndex(element => element !== null)
    typeToCheck = type[index]
  }
  const isInteger = typeToCheck === "integer"
  const fieldType = isInteger ? "number" : typeToCheck
  const inputProps = isInteger ? { min: schema.minimum } : undefined
  return (
    <TextField
      id={id}
      required={required}
      type={fieldType}
      label={label}
      margin="normal"
      value={value !== null ? value : ""}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={event => props.onChange(event.target.value)}
      InputProps={{
        className: styles.textControl,
        inputProps,
      }}
      defaultValue={defaultValue !== null ? defaultValue : ""}
    />
  )
}
