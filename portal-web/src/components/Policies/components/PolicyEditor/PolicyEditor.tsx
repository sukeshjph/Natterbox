import { Paper } from "@material-ui/core"
import React from "react"
import Button from "@material-ui/core/Button"
import Spinner from "react-spinkit"
import styles from "../Policies.module.scss"
import { ZoomInIcon, ZoomOutIcon } from "../../../shared/Images"
import { PolicyOptions } from "./PolicyOptions"
import { PolicyFeatureItem, PolicyOptionsType } from "../Policies.type"
import { ErrorAlert, Loading } from "../../../shared"
import { useMutablePolicyEditorHooks } from "./PolicyEditorHooks"
import {
  setNameError,
  setPolicyOptionsOpen,
  setSelectedComponent,
} from "../PoliciesActions"
import { PolicyView } from "./PolicyView"
import {
  PolicyEditorStateContext,
  PolicyEditorDispatchContext,
} from "../../context/PolicyEditor.context"
import { ComponentOptions } from "./ComponentOptions/ComponentOptions"

export const PolicyEditor = props => {
  const {
    state,
    dispatch,
    policyId,
    isNewPolicy,
    mutationLoading,
    updatePolicyOptions,
    handleSaveClick,
    createdPolicyData,
    createPolicyError,
    onUpdate,
    showPolicyView,
  } = useMutablePolicyEditorHooks(props)

  const { policyOptionsOpen, policy, showNameError, selectedComponent } = state

  const handleOptionsDrawerToggled = () => {
    dispatch(setPolicyOptionsOpen(!policyOptionsOpen))
  }

  const handleNewPolicy = () => {}

  const handleDeletePolicy = () => {}

  const handleAddStartingPoint = () => {}

  const handleUpdatePolicyOptions = (policyOptions: PolicyOptionsType) => {
    updatePolicyOptions(policyOptions, isSuccess => {
      dispatch(setNameError(!isSuccess))
      if (isSuccess) {
        dispatch(setPolicyOptionsOpen(false))
      }
    })
  }

  const handleUpdateComponent = (component: PolicyFeatureItem | null) => {
    if (component) {
      onUpdate(component)
    }
    dispatch(setSelectedComponent(null))
  }
  return (
    <PolicyEditorStateContext.Provider value={state}>
      <PolicyEditorDispatchContext.Provider value={dispatch}>
        <p className={styles.policyHeader}>
          <span className={styles.policyTitle}>
            Brightec Demo / policies / {policy && policy.name}
          </span>
        </p>
        {showNameError && (
          <ErrorAlert message="You must name the policy" severity="error" />
        )}
        <Paper data-tesid="PoliciesEditor">
          {mutationLoading && (
            <Loading spinner={<Spinner name="line-scale" />} />
          )}
          {createPolicyError && (
            <ErrorAlert
              message="Sorry something went wrong, please try again"
              severity="error"
            />
          )}
          <PolicyOptions
            drawerState={policyOptionsOpen}
            onUpdate={handleUpdatePolicyOptions}
            policyOptions={policy as PolicyOptionsType}
          />
          <ComponentOptions
            drawerState={selectedComponent !== null}
            onUpdate={handleUpdateComponent}
            component={selectedComponent}
          />
          <div className={styles.tableHeader}>
            <div className={styles.headerLeft}>
              <div>
                <ZoomInIcon />
              </div>
              <div>
                <ZoomOutIcon />
              </div>
            </div>
            <div className={styles.headerRight}>
              {createdPolicyData && (
                <div className={styles.dateString}>
                  Last Saved: {createdPolicyData.modified}
                </div>
              )}
            </div>
            <div className={styles.headerRight}>
              {createdPolicyData && (
                <div className={styles.dateString}>
                  Last Saved: {createdPolicyData.modified}
                </div>
              )}
              <div className={styles.headerButtons}>
                <Button
                  color="primary"
                  variant="contained"
                  className={styles.headerButton}
                  onClick={handleSaveClick}>
                  Save
                </Button>
                {!isNewPolicy && (
                  <Button
                    color="primary"
                    variant="contained"
                    className={styles.headerButton}
                    onClick={handleNewPolicy}>
                    New Policy
                  </Button>
                )}
                <Button
                  color="default"
                  variant="outlined"
                  onClick={handleOptionsDrawerToggled}>
                  Options
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleDeletePolicy}>
                  Delete Policy
                </Button>
              </div>
            </div>
          </div>
          <Button
            color="primary"
            variant="contained"
            className={styles.headerButton}
            onClick={handleAddStartingPoint}>
            Add Starting Point
          </Button>
          <div>
            {showPolicyView && (
              <PolicyView policyId={policyId} onUpdate={onUpdate} />
            )}
          </div>
        </Paper>
      </PolicyEditorDispatchContext.Provider>
    </PolicyEditorStateContext.Provider>
  )
}
