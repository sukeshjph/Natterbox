import { useContext, useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import { JSONParser } from "natterbox_json_parser/lib"
import {
  PolicyEditorDispatchContext,
  PolicyEditorStateContext,
} from "../../../context/PolicyEditor.context"
import {
  ParsedTemplateType,
  PolicyFeatureItem,
  UnParsedTemplateType,
} from "../../Policies.type"
import { GET_TEMPLATE_BY_ID } from "../../PoliciesQueries"
import { removeTemplate, setTemplate } from "../../PoliciesActions"

type OwnProps = {
  drawerState: boolean
  onUpdate: (component: PolicyFeatureItem | null) => void
  component: PolicyFeatureItem | null
}

export const useComponentOptionsHook = ({ component, onUpdate }: OwnProps) => {
  const { templates } = useContext(PolicyEditorStateContext)
  const dispatch = useContext(PolicyEditorDispatchContext)
  const [formSchemaId, setFormSchemaId] = useState("")
  const [formData, setFormData] = useState<any | null>(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showReadOnlyData, setShowReadOnlyData] = useState(false)
  const [
    unParsedSchema,
    setUnParsedSchema,
  ] = useState<UnParsedTemplateType | null>(null)
  const [parsedSchema, setParsedSchema] = useState<ParsedTemplateType | null>(
    null,
  )
  const [loadTemplate, loadState] = useLazyQuery(GET_TEMPLATE_BY_ID)

  useEffect(() => {
    setFormSchemaId(component ? component.templateId : "")
    setFormData(component ? component.variables : null)
  }, [component])

  useEffect(() => {
    setUnParsedSchema(null)
    setShowReadOnlyData(false)
    if (!formSchemaId) {
      return
    }
    const schema = templates[formSchemaId] || null
    setParsedSchema(schema)
    if (!schema) {
      loadTemplate({
        variables: {
          id: formSchemaId,
        },
      })
    }
  }, [formSchemaId])

  useEffect(() => {
    const { loading, error, data } = loadState
    setIsError(!!error)
    setIsLoading(loading)
    if (loading || !!error || !data) {
      return
    }
    setUnParsedSchema(data.template)
  }, [loadState])

  useEffect(() => {
    if (!unParsedSchema) {
      return
    }
    try {
      setParsedSchema({
        ...unParsedSchema,
        variables: JSONParser(unParsedSchema.variables),
      })
    } catch (error) {
      setIsError(true)
      if (formSchemaId && dispatch) {
        dispatch(removeTemplate(formSchemaId))
      }
      setShowReadOnlyData(true)
    }
  }, [unParsedSchema])

  useEffect(() => {
    if (parsedSchema && formSchemaId && dispatch) {
      dispatch(setTemplate(formSchemaId, parsedSchema))
    }
  }, [parsedSchema])

  useEffect(() => {
    if (formSchemaId && !parsedSchema) {
      setParsedSchema(templates[formSchemaId] || null)
    }
  }, [templates])

  const shouldFormClose = false

  const handleSubmitForm = form => {
    if (!component || !form || !parsedSchema || !parsedSchema.variables) {
      onUpdate(null)
      return
    }
    if (form.errors.length) {
      return
    }
    onUpdate({
      ...component,
      variables: form.formData,
    })
  }

  return {
    parsedSchema,
    isLoading,
    isError,
    formData,
    shouldFormClose,
    handleSubmitForm,
    showReadOnlyData,
  }
}
