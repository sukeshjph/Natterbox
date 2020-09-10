/* Internal helpers */
import {
  FeatureLayoutType,
  PolicyFeatureItem,
  PolicyFeatureRootItem,
} from "./Policies.type"
import {
  DEFAULT_FEATURE_COLOR,
  StandardFeatureColors,
  StandardTemplateColors,
} from "../../shared/styles/sharedStyles"

export const itemKeysWithImports = (
  items: PolicyFeatureRootItem[] | null,
): { [id: string]: FeatureLayoutType } => {
  if (!Array.isArray(items)) {
    return {}
  }
  const keyedStubForId = id => {
    return id
      ? {
          [id]: {
            id,
            parentId: null,
            allowsInput: false,
            previousIds: [],
            allowsOutput: false,
            nextIds: [],
            color: DEFAULT_FEATURE_COLOR,
            gridCoords: { column: 0, row: 0 },
          },
        }
      : {}
  }

  const reduceItemsToKeyedStubs = (reducedKeys, item) => {
    return {
      ...reducedKeys,
      ...keyedStubForId(item.id),
      ...(Array.isArray(item.subItems) && item.subItems.length
        ? item.subItems.reduce(reduceItemsToKeyedStubs, {})
        : {}),
    }
  }

  return items.reduce(reduceItemsToKeyedStubs, {})
}

export const featureLayoutsWithLinkedInputs = (layouts: {
  [id: string]: FeatureLayoutType
}): {
  [id: string]: FeatureLayoutType
} => {
  const mergeIdIntoIdArray = (idToMerge, ids) => {
    if (ids.includes(idToMerge)) {
      return ids
    }
    return [...ids, idToMerge]
  }

  const linkPreviousIds = key => (reducedLayouts, nextId) => {
    const layout = reducedLayouts[nextId]
    const { previousIds } = layout
    return {
      ...reducedLayouts,
      [nextId]: {
        ...reducedLayouts[nextId],
        previousIds: mergeIdIntoIdArray(reducedLayouts[key].id, previousIds),
      },
    }
  }

  return Object.keys(layouts).reduce((reducedLayouts, key) => {
    return {
      ...reducedLayouts,
      ...reducedLayouts[key].nextIds.reduce(
        linkPreviousIds(key),
        reducedLayouts,
      ),
    }
  }, layouts)
}

export const mergeLayoutPreviousIdsWithItem = (item, layout) => {
  const { variables } = item
  if (variables && variables.nextId) {
    return [...layout.nextIds, variables.nextId]
  }
  return layout.nextIds
}

export const colorForItem = (item: PolicyFeatureItem) =>
  StandardFeatureColors[item.name.toUpperCase().replace(/\s/g, "")] ||
  StandardTemplateColors[item.templateId] ||
  DEFAULT_FEATURE_COLOR

export const featureComponentModelsFromFeatureData = data => {
  if (!data || !data.items) {
    return {}
  }
  const { items } = data
  const featureLayouts = itemKeysWithImports(items)
  items.forEach(item => {
    const layout = featureLayouts[item.id]
    featureLayouts[item.id] = {
      ...layout,
      color: colorForItem(item),
      nextIds: mergeLayoutPreviousIdsWithItem(item, layout),
      allowsInput: true,
      allowsOutput: true,
    }
    if (Array.isArray(item.subItems)) {
      item.subItems.forEach(subItem => {
        const subLayout = featureLayouts[subItem.id]
        featureLayouts[subItem.id] = {
          ...subLayout,
          parentId: item.id,
          nextIds: mergeLayoutPreviousIdsWithItem(subItem, subLayout),
          allowsInput: false,
          allowsOutput: true,
        }
      })
    }
  })
  return featureLayoutsWithLinkedInputs(featureLayouts)
}
