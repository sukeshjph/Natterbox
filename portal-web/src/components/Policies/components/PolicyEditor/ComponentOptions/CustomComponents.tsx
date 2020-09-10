import Field from "@rjsf/core/lib/"

/** Takes a full schema Id path and returns the deepest field ID
 * @param id
 * @returns {string}
 */
export const fieldIdFromFullSchemaId = id => {
  if (typeof id !== "string" || !id.length) {
    return "default"
  }
  return (
    id
      .split("_")
      .filter((item, index, array) => index === array.length - 1)
      .shift() || "default"
  )
}

/**
 * Takes a dictionary of custom widgets by their associated IDs and a default widget for if no IDs match
 * Returns either the associated component, default component or null (this is allowed if no output is required).
 * @param widgetsById
 * @param defaultWidget
 * @returns {(props) => JSX.Element | null}
 */
export const CustomWidgetsById = (
  widgetsById: { [key: string]: (props) => JSX.Element | null },
  defaultWidget: (props) => JSX.Element | null,
) => props => {
  const { id } = props
  if (id) {
    const fieldId = fieldIdFromFullSchemaId(id)
    if (widgetsById[fieldId]) {
      return widgetsById[fieldId](props)
    }
  }
  return defaultWidget ? defaultWidget(props) : null
}

/**
 * Takes a dictionary of custom fields by their associated IDs and a default widget for if no IDs match
 * Returns either the associated component, default component or null (this is allowed if no output is required).
 * @param fieldsById
 * @param DefaultField
 * @returns {(props) => JSX.Element | null}
 */
export const CustomFieldsById = (
  fieldsById: { [key: string]: (props) => JSX.Element | null },
  DefaultField: Field | null,
) => props => {
  const {
    idSchema: { $id: id },
  } = props
  if (id) {
    const fieldId = fieldIdFromFullSchemaId(id)
    if (fieldsById[fieldId]) {
      return fieldsById[fieldId](props)
    }
  }
  return DefaultField ? new DefaultField(props) : null
}
