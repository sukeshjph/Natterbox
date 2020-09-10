import { createReducer } from "@reduxjs/toolkit"
import {
  PoliciesEditorStateType,
  PoliciesListStateType,
  PolicyOptionsType,
  PolicyType,
  PolicyTypeOption,
} from "./Policies.type"
import {
  removeTemplate,
  setCurrentPageIndex,
  setCurrentTabIndex,
  setErrorSnack,
  setNameError,
  setPoliciesTypeToShow,
  setPolicy,
  setPolicyLayout,
  setPolicyOptionsOpen,
  setSearchInput,
  setSearchTerm,
  setSelectedComponent,
  setTemplate,
} from "./PoliciesActions"
import { PolicyColProps } from "./PoliciesList/PolicyColProps"

export const initialPolicyEditorState: PoliciesEditorStateType = {
  policyOptionsOpen: false,
  policy: null,
  featureLayouts: {},
  showNameError: false,
  selectedComponent: null,
  templates: {},
}

export const initialPoliciesListState: PoliciesListStateType = {
  errorSnack: false,
  currentPageIndex: 0,
  currentTabIndex: 0,
  policiesTypeToShow: null,
  searchInput: null,
  searchTerm: null,
  policyColProps: PolicyColProps,
}

export const initialPolicyOptionsState: PolicyOptionsType = {
  name: "",
  type: PolicyTypeOption.CALL,
  enabled: false,
}

export const initialPolicyState: PolicyType = {
  ...initialPolicyOptionsState,
  items: [],
}

export const policiesListReducer = createReducer(
  initialPoliciesListState,
  builder =>
    builder
      .addCase(setErrorSnack, (state, action) => ({
        ...state,
        errorSnack: action.payload,
      }))
      .addCase(setCurrentPageIndex, (state, action) => ({
        ...state,
        currentPageIndex: action.payload,
      }))
      .addCase(setCurrentTabIndex, (state, action) => ({
        ...state,
        currentTabIndex: action.payload,
      }))
      .addCase(setPoliciesTypeToShow, (state, action) => ({
        ...state,
        policiesTypeToShow: action.payload,
      }))
      .addCase(setSearchInput, (state, action) => ({
        ...state,
        searchInput: action.payload,
      }))
      .addCase(setSearchTerm, (state, action) => ({
        ...state,
        searchTerm: action.payload,
      })),
)

export const policiesEditorReducer = createReducer(
  initialPolicyEditorState,
  builder =>
    builder
      .addCase(setPolicyOptionsOpen, (state, action) => ({
        ...state,
        policyOptionsOpen: action.payload,
      }))
      .addCase(setPolicy, (state, action) => ({
        ...state,
        policy: action.payload,
      }))
      .addCase(setNameError, (state, action) => ({
        ...state,
        showNameError: action.payload,
      }))
      .addCase(setPolicyLayout, (state, action) => ({
        ...state,
        featureLayouts: action.payload,
      }))
      .addCase(setSelectedComponent, (state, action) => ({
        ...state,
        selectedComponent: action.payload,
      }))
      .addCase(setTemplate, (state, action) => ({
        ...state,
        templates: {
          ...state.templates,
          [action.payload.templateId]: action.payload.template,
        },
      }))
      .addCase(removeTemplate, (state, action) => ({
        ...state,
        template: Object.keys(state.templates)
          .filter(key => key !== action.payload)
          .reduce(
            (templates, key) => ({ ...templates, [key]: state.templates[key] }),
            {},
          ),
      })),
)
