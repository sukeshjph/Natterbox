import React from "react"
import styles from "./PolicyFeature.module.scss"
import {
  PolicyEditorStateContext,
  PolicyEditorDispatchContext,
} from "../../context/PolicyEditor.context"
import { setSelectedComponent } from "../PoliciesActions"

enum ConnectionType {
  INPUT = "input",
  OUTPUT = "output",
}

const Connection = ({ connectId, className, type, ...rest }) => {
  const { isEnabled, connectTo, connectFrom } = rest
  const style = connectTo || connectFrom ? styles.Connected : ""
  return (
    <div
      className={className}
      data-connect-id={connectId}
      data-connect-to={connectTo}>
      {isEnabled && <div className={`${styles.Button} ${style}`} />}
    </div>
  )
}

const FeatureComponent = ({ model, ...rest }) => {
  const { id, name, variables } = model
  const { isActive /* onUpdate */ } = rest

  /* Depending on how the editing structure works, the onUpdate function may
   * not need to be drilled down to component level, if not required, it can be removed. */

  const outConnections = variables && variables.nextId ? variables.nextId : null
  return (
    <PolicyEditorDispatchContext.Consumer>
      {dispatch => (
        <div className={styles.ComponentContainer}>
          <div className={styles.Import} />
          <div
            className={`${styles.Component} ${isActive ? styles.Active : null}`}
            onDoubleClick={() =>
              dispatch && dispatch(setSelectedComponent(model))
            }>
            {name}
          </div>
          <Connection
            type={ConnectionType.OUTPUT}
            connectId={id}
            connectTo={outConnections}
            className={styles.Export}
            isEnabled
          />
        </div>
      )}
    </PolicyEditorDispatchContext.Consumer>
  )
}

export const PolicyFeature = ({ model, featureLayout, ...rest }) => {
  const { id, name, subItems } = model
  const { isActive, onUpdate } = rest
  const { previousIds, nextIds, allowsInput, allowsOutput } = featureLayout
  const outConnections = nextIds.join(" ")
  const inConnections = previousIds.join(" ")

  /* Depending on how the editing structure works, the onUpdate function may
   * not need to be drilled down to Feature level, if not required, it can be removed. */

  const featureComponentUpdateHandler = modifiedComponent =>
    typeof onUpdate === "function" &&
    onUpdate({
      ...model,
      subItems: model.subItems.map(item =>
        item.id === modifiedComponent.id ? modifiedComponent : item,
      ),
    })

  const isActiveClass = isActive ? styles.Active : null

  return (
    <PolicyEditorDispatchContext.Consumer>
      {dispatch => (
        <PolicyEditorStateContext.Consumer>
          {({ selectedComponent }) => (
            <div className={`${styles.PolicyFeature} ${isActiveClass}`}>
              <div
                className={`${styles.Header} ${styles.ComponentContainer}`}
                style={{ backgroundColor: featureLayout.color }}>
                <Connection
                  type={ConnectionType.INPUT}
                  connectId={id}
                  connectFrom={inConnections}
                  className={styles.Import}
                  isEnabled={allowsInput}
                />
                <div
                  className={styles.Component}
                  onDoubleClick={() =>
                    dispatch && dispatch(setSelectedComponent(model))
                  }>
                  {name}
                </div>
              </div>
              <div className={styles.Content}>
                {subItems.map(subItemModel => (
                  <FeatureComponent
                    key={`component-${subItemModel.id}`}
                    model={subItemModel}
                    isActive={
                      selectedComponent !== null &&
                      selectedComponent.id === subItemModel.id
                    }
                    onUpdate={featureComponentUpdateHandler}
                  />
                ))}
              </div>
              <div
                className={`${styles.Footer} ${styles.ComponentContainer}`}
                style={{ backgroundColor: `${featureLayout.color}80` }}>
                <div
                  className={styles.Component}
                  onDoubleClick={() =>
                    dispatch && dispatch(setSelectedComponent(id))
                  }>
                  &nbsp;
                </div>
                <Connection
                  type={ConnectionType.OUTPUT}
                  connectId={id}
                  connectTo={outConnections}
                  className={styles.Export}
                  isEnabled={allowsOutput}
                />
              </div>
            </div>
          )}
        </PolicyEditorStateContext.Consumer>
      )}
    </PolicyEditorDispatchContext.Consumer>
  )
}
