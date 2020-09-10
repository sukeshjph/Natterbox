import { createAction } from "@reduxjs/toolkit"
import { featureComponentModelsFromFeatureData } from "./PoliciesActionsHelpers"
import {
  ISearchParams,
  ParsedTemplateType,
  PolicyFeatureItem,
  PolicyType,
} from "./Policies.type"

/* Policies List */
export const setErrorSnack = createAction<boolean>("setErrorSnack")
export const setCurrentPageIndex = createAction<number>("setCurrentPageIndex")
export const setCurrentTabIndex = createAction<number>("setCurrentTabIndex")
export const setPoliciesTypeToShow = createAction<string>(
  "setPoliciesTypeToShow",
)
export const setSearchInput = createAction<ISearchParams | null>(
  "setSearchInput",
)
export const setSearchTerm = createAction<string | null>("setSearchTerm")

/* PoliciesEditor */
export const setPolicyOptionsOpen = createAction<boolean>(
  "setPolicyOptionsOpen",
)
export const setPolicy = createAction<PolicyType | null>("setPolicy")
export const setNameError = createAction<boolean>("setNameError")
export const setPolicyLayout = createAction(
  "setPolicyLayout",
  (policy: PolicyType | null) => {
    const featureLayouts = policy
      ? featureComponentModelsFromFeatureData(policy)
      : {}
    return {
      payload: featureLayouts,
    }
  },
)
export const setTemplate = createAction(
  "setTemplate",
  (templateId: string, template: ParsedTemplateType) => {
    return {
      payload: {
        templateId,
        template,
      },
    }
  },
)
export const removeTemplate = createAction(
  "removeTemplate",
  (templateId: string) => {
    return {
      payload: templateId,
    }
  },
)
export const setSelectedComponent = createAction<PolicyFeatureItem | null>(
  "setSelectedComponent",
)
