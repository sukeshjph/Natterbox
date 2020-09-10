export enum PolicyTypeOption {
  CALL = "CALL",
  NON_CALL = "NON_CALL",
  SYSTEM = "SYSTEM",
}

export interface IPolicy {
  id: number
  name: string
  type: string
  enabled: Boolean
  created: string
  modified: string
}

export interface PolicyOptionsType {
  name: string
  type: string
  enabled: Boolean
}

export interface PolicyFeatureItem {
  id: string
  name: string
  templateId: string
  variables: {} | null
}

export interface PolicyFeatureRootItem extends PolicyFeatureItem {
  subItems: PolicyFeatureItem[] | null
}

export interface PolicyType extends PolicyOptionsType {
  items: PolicyFeatureRootItem[]
}

export interface IPoliciesWithPagers extends IPager {
  policies: IPolicy[]
}

export interface ISearchParams {
  name: string
}

export interface PoliciesListStateType {
  errorSnack: boolean
  currentPageIndex: number
  currentTabIndex: number
  policiesTypeToShow: string | null
  searchInput: ISearchParams | null
  searchTerm: string | null
  policyColProps: IColType<IPolicy>[]
}

export interface TemplateVariablesType {
  type: string
  additionalProperties: boolean
  properties: any
}

export interface TemplateType {
  id: string
  parent: string
  name: string
  description: string
  type: string
}

export interface UnParsedTemplateType extends TemplateType {
  variables: TemplateVariablesType
}

export interface ParsedTemplateType extends TemplateType {
  variables: any
}

export interface PoliciesEditorStateType {
  policyOptionsOpen: boolean
  policy: PolicyType | null
  featureLayouts: FeatureLayouts | {}
  selectedComponent: PolicyFeatureItem | null
  showNameError: boolean
  templates: { [key: string]: ParsedTemplateType }
}

export interface PolicyOptionsStateType {
  policyOptions: PolicyOptionsType
}

export interface FeatureLayouts {
  [key: string]: FeatureLayoutType
}

export interface GridCoordinates {
  column: number
  row: number
}

export interface FeatureLayoutType {
  id: string
  parentId: string | null
  previousIds: string[]
  nextIds: string[]
  allowsInput: boolean
  allowsOutput: boolean
  color: string
  gridCoords: GridCoordinates
}
