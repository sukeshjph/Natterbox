import React from "react"
import styles from "./PolicyView.module.scss"
import { PolicyFeature } from "./PolicyFeature"
import { PolicyEditorStateContext } from "../../context/PolicyEditor.context"
import { PolicyFeatureRootItem } from "../Policies.type"
import { PolicyConnections } from "./PolicyConnections"

// TODO: Move the auto-layout code to PoliciesActionHelpers, and store the layout as grid coordinates.
/**
 * Takes an array of items and their corresponding feature layouts and returns
 * a layout of PolicyFeature columns based on their relationship to one another.
 * @param {PolicyFeatureRootItem[]} items
 * @param {{[id: string]: FeatureLayoutType}} featureLayouts
 * @param {string} selectedComponentId
 * @param onUpdate
 * @returns {JSX.Element[]}
 */
const autoLayoutToColumns = ({
  items,
  featureLayouts,
  selectedComponentId,
  onUpdate,
}): JSX.Element[] => {
  /**
   * Returns true if the item and it's subItems have no forward connections.
   * @param item
   * @returns {boolean}
   */
  const isDeadEndItem = item => {
    if (item.variables && item.variables.nextId) {
      return false
    }
    return (
      item.subItems.filter(
        subItem => subItem.variables && subItem.variables.nextId,
      ).length === 0
    )
  }

  /**
   * A reducer to distribute one column of PolicyFeatureRootItems
   * between multiple columns based on a threshold of maximum items
   * allowed per column.
   * @param {number} threshold
   * @returns {PolicyFeatureRootItem[][]}
   */
  const distributeColumnsReducer = threshold => (
    columns: PolicyFeatureRootItem[][],
    item: PolicyFeatureRootItem,
  ): PolicyFeatureRootItem[][] => {
    const lastColumn = columns.length - 1
    const mutableColumns = [...columns]
    if (isDeadEndItem(item)) {
      mutableColumns[0].push(item)
      return mutableColumns
    }
    if (columns[lastColumn].length > threshold) {
      return [...columns, [item]]
    }
    mutableColumns[lastColumn].push(item)
    return mutableColumns
  }

  /**
   * Return columns containing all PolicyFeatureRootItems
   * with no inputs
   * @param allItems
   * @returns {PolicyFeatureRootItem[][]}
   */
  const allStartItems = allItems =>
    allItems
      .filter(({ id }) => !featureLayouts[id].previousIds.length)
      .reduce(distributeColumnsReducer(5), [[]])

  /**
   * Return columns containing all PolicyFeatureRootItems
   * with no outputs
   * @param allItems
   * @returns {PolicyFeatureRootItem[][]}
   */
  const allEndItems = allItems =>
    allItems
      .filter(
        item =>
          featureLayouts[item.id].previousIds.length && isDeadEndItem(item),
      )
      .reduce(distributeColumnsReducer(5), [[]])

  /**
   * Takes an array of PolicyFeatureRootItems and returns
   * a lookup containing the ids of the items.
   * @param allocatedItems
   * @returns {{ [key: string]: boolean }}
   */
  const allocatedKeysFromItems = allocatedItems => {
    return allocatedItems.reduce((keys, column) => {
      return column.reduce((columnKeys, { id }) => {
        return {
          ...columnKeys,
          [id]: true,
        }
      }, keys)
    }, {})
  }

  const startColumns: PolicyFeatureRootItem[][] = allStartItems(items)
  const endColumns: PolicyFeatureRootItem[][] = allEndItems(items)
  const columns: PolicyFeatureRootItem[][] = [[]]
  const allocatedKeys: { [key: string]: boolean } = allocatedKeysFromItems([
    ...startColumns,
    ...endColumns,
  ])

  /**
   * Recursive mutating function that follows the connections of an item
   * allocating each subsequent item a column if not already allocated one
   * and then updating the allocated keys with the item's id.
   * @param item
   * @param depth
   */
  const allocateItem = (item, depth = 0) => {
    const { id, subItems } = item
    const layout = featureLayouts[id]
    const { nextIds } = layout
    const allNextIds = subItems
      .map(subItem => featureLayouts[subItem.id].nextIds)
      .flat()
      .concat(nextIds)

    allNextIds.forEach(nextId => {
      const nextLayout = featureLayouts[nextId]
      const nextParentId = nextLayout.parentId
        ? nextLayout.parentId
        : nextLayout.id
      if (allocatedKeys[nextParentId]) {
        return
      }
      const nextItem = items
        .filter(filterItem => filterItem.id === nextParentId)
        .shift()
      if (!Array.isArray(columns[depth])) {
        columns[depth] = []
      }
      columns[depth].push(nextItem)
      allocatedKeys[nextParentId] = true
      allocateItem(nextItem, depth + 1)
    })
  }

  startColumns.forEach(column => column.forEach(item => allocateItem(item)))

  const distributedColumns: PolicyFeatureRootItem[][] = columns
    .reduce(
      (reducedColumns: PolicyFeatureRootItem[][], column) => [
        ...reducedColumns,
        ...column.reduce(distributeColumnsReducer(5), [[]]),
      ],
      [[]],
    )
    .filter(column => column.length)

  return [...startColumns, ...distributedColumns, ...endColumns].map(column => (
    <div
      key={`column-first-item-${column[0].id}`}
      className={`${styles.PolicyFeatureColumn}`}>
      {column.map(item => (
        <PolicyFeature
          key={`policy-feature-${item.id}`}
          model={item}
          featureLayout={featureLayouts[item.id]}
          isActive={selectedComponentId === item.id}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  ))
}

export const PolicyView = ({ policyId, onUpdate }) => {
  const uuid = `policy-viewer-${policyId}`
  return (
    <PolicyEditorStateContext.Consumer>
      {({ policy, featureLayouts, selectedComponent }) => {
        const selectedComponentId = selectedComponent
          ? selectedComponent.id
          : null
        return (
          <div id={uuid} className={styles.PolicyViewArea}>
            <div className={styles.PolicyViewContent}>
              {!!policy && <PolicyConnections id={uuid} />}
              {!!policy &&
                autoLayoutToColumns({
                  items: policy.items,
                  featureLayouts,
                  selectedComponentId,
                  onUpdate,
                })}
            </div>
          </div>
        )
      }}
    </PolicyEditorStateContext.Consumer>
  )
}
