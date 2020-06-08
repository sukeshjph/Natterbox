import { splitEvery, keys } from "ramda"

export const getPaginatedResults = ({
  index = 0,
  length = 100,
  results,
  dynamicKey,
}) => {
  const objPage = {
    firstIndex: 0,
    lastIndex: 0,
    prevIndex: 0,
    nextIndex: 0,
    hasMore: false,
    count: 0,
    [dynamicKey]: [],
  }

  if (results.length === 0) {
    return objPage
  }

  if (results.length <= length) {
    return {
      ...objPage,
      count: 1,
      [dynamicKey]: results,
    }
  }

  if (results.length > length) {
    const pagedResults = splitEvery(length, results)
    const isItLastPage = index === pagedResults.length - 1
    const lastIndex = pagedResults.length - 1
    const prevIndex = index === 0 ? 0 : index - 1
    const nextIndex = !isItLastPage ? index + 1 : index

    return {
      ...objPage,
      lastIndex,
      prevIndex,
      nextIndex,
      [dynamicKey]: pagedResults[index],
      count: pagedResults.length,
      hasMore: !isItLastPage,
    }
  }

  return objPage
}

export const getResultsFilteredByKeys = <T extends unknown>(
  results: T[] = [],
  keysObj: Record<string, string>,
  filterFuncObj?: Record<string, (item: any) => boolean>,
): T[] => {
  const allKeys = keys(keysObj)

  if (allKeys.length === 0) return []

  return allKeys.reduce(
    (accResults, key) =>
      accResults.filter(obj => {
        return keys(filterFuncObj).includes(key)
          ? filterFuncObj[key](obj)
          : obj[key] === keysObj[key]
      }),
    results,
  )
}
