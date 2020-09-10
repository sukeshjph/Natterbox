import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import React from "react"
import { Theme as MaterialUITheme } from "@rjsf/material-ui"
import Button from "@material-ui/core/Button"
import Spinner from "react-spinkit"
import ArrayField from "@rjsf/core/lib/components/fields/ArrayField"
import styles from "./ComponentOptions.module.scss"
import { portalWithTheme } from "../../../../../poly-fills"
import { CustomFieldText } from "./CustomFieldText"
import { CustomFieldSelect } from "./CustomFieldSelect"
import { Loading } from "../../../../shared"
import { useComponentOptionsHook } from "./ComponentOptionsHooks"
import { CustomFieldsById, CustomWidgetsById } from "./CustomComponents"
import { CustomFieldNextId } from "./CustomFieldNextId"
import { CustomFieldScript } from "./CustomFieldScript"
import { PolicyFeatureItem } from "../../Policies.type"
import { CustomFieldSwitch } from "./CustomFieldSwitch"
import { CustomEmailWidget } from "./CustomEmailWidget"
import { CustomUrlWidget } from "./CustomUrlWidget"

type OwnProps = {
  drawerState: boolean
  onUpdate: (component: PolicyFeatureItem | null) => void
  component: PolicyFeatureItem | null
}

const widgets = {
  TextWidget: CustomWidgetsById(
    {
      nextId: CustomFieldNextId,
      script: CustomFieldScript,
    },
    CustomFieldText,
  ),
  SelectWidget: CustomFieldSelect,
  CheckboxWidget: CustomFieldSwitch,
  EmailWidget: CustomEmailWidget,
  URLWidget: CustomUrlWidget,
}

const fields = {
  ArrayField: CustomFieldsById({}, ArrayField),
}

const ErrorListTemplate = props => {
  const { errors } = props
  return (
    <div>
      {errors.map(error => (
        <div className={styles.formError}>{error.stack}</div>
      ))}
    </div>
  )
}

const variablesTable = variables => {
  return (
    <div className={styles.VariablesTable}>
      <div className={styles.Row}>
        <div className={styles.Heading}>Configuration:</div>
      </div>
      {variables &&
        Object.keys(variables).map(key => (
          <div className={styles.Row}>
            <div className={styles.Key}>{key}</div>
            <div className={styles.Value}>{variables[key]}</div>
          </div>
        ))}
      {!variables && (
        <div className={styles.Row}>
          There is nothing configured for this component.
        </div>
      )}
    </div>
  )
}

export const ComponentOptions = (props: OwnProps) => {
  const { drawerState } = props
  const {
    parsedSchema,
    isLoading,
    isError,
    formData,
    shouldFormClose,
    showReadOnlyData,
    handleSubmitForm,
  } = useComponentOptionsHook(props)
  const Form = portalWithTheme(MaterialUITheme)

  return (
    <SwipeableDrawer
      anchor="right"
      open={drawerState}
      onClose={() => shouldFormClose}
      onOpen={() => {}}
      classes={{
        root: styles.root,
        paper: styles.componentOptionsPaper,
      }}>
      <div className={styles.pullOutContainer}>
        {isLoading && <Loading spinner={<Spinner name="line-scale" />} />}
        {!isLoading && isError && (
          <div className={styles.SchemaError}>
            The schema is currently unavailable.
          </div>
        )}
        {showReadOnlyData && variablesTable(formData)}
        {!!parsedSchema && (
          <div className={styles.TemplateName}>{parsedSchema.name}</div>
        )}
        {!!parsedSchema && parsedSchema.variables && (
          <Form
            schema={parsedSchema.variables}
            formData={formData}
            widgets={widgets}
            fields={fields}
            className={styles.form}
            onSubmit={handleSubmitForm}
            liveValidate
            ErrorList={ErrorListTemplate}>
            <div className={styles.submitButtonContainer}>
              <Button
                color="primary"
                variant="contained"
                className={styles.submitButton}
                type="submit">
                Submit
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                className={styles.removeButton}>
                Remove
              </Button>
            </div>
          </Form>
        )}
      </div>
    </SwipeableDrawer>
  )
}
