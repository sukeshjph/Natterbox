import React, { useEffect, useState } from "react"
import styles from "./PolicyConnections.module.scss"

type Connection = {
  color: string
  path: string
}

export const PolicyConnections = ({ id }) => {
  const [connections, setConnections] = useState<Connection[]>([])

  /**
   * Helper method to combine coordinates into an SVG bezier path
   * @param cx1
   * @param cy1
   * @param cx2
   * @param cy2
   * @param x
   * @param y
   * @returns {string}
   */
  const bezierPath = (cx1, cy1, cx2, cy2, x, y) => {
    return `C${cx1},${cy1} ${cx2},${cy2} ${x},${y} `
  }

  /**
   * Takes two sets of top/left coordinates and returns
   * an SVG path string with variations based on the relationship
   * between the two sets of coordinates.
   * @param {number} fromLeft
   * @param {number} fromTop
   * @param {number} toLeft
   * @param {number} toTop
   * @returns {string}
   */
  const pathForCoordinates = ({ fromLeft, fromTop, toLeft, toTop }) => {
    const width = Math.abs(toLeft - fromLeft)
    const height = Math.abs(toTop - fromTop)
    const isForward = fromLeft < toLeft
    const halfWidth = width / 2
    const halfHeight = height / 2
    const lineFactor = width / height
    const clearance = 30
    const isLongForward = isForward && lineFactor > 2
    const origin = `M${fromLeft},${fromTop}`

    switch (true) {
      case !isForward:
        return `${origin} ${bezierPath(
          fromLeft + clearance,
          fromTop,
          fromLeft + clearance,
          fromTop + clearance,
          fromLeft,
          fromTop + clearance,
        )} L${toLeft + clearance * 3},${fromTop + clearance} ${bezierPath(
          toLeft,
          fromTop + clearance,
          toLeft - clearance,
          toTop + clearance,
          toLeft,
          toTop,
        )}`
      case isLongForward:
        return `${origin} L${toLeft - clearance * 2},${fromTop} ${bezierPath(
          toLeft,
          fromTop,
          toLeft - clearance,
          toTop,
          toLeft,
          toTop,
        )}`
      case lineFactor > 1.5 && height > clearance * 2:
        return `${origin} ${bezierPath(
          fromLeft + halfWidth,
          fromTop,
          toLeft,
          toTop + halfHeight,
          toLeft,
          toTop,
        )}`
      default:
        return `${origin} ${bezierPath(
          fromLeft + halfWidth,
          fromTop,
          toLeft - halfWidth,
          toTop,
          toLeft,
          toTop,
        )}`
    }
  }

  /**
   * Takes two elements and their container and returns
   * a path that connects them both within the container space.
   * @param {Element} nodeFrom
   * @param {Element} nodeTo
   * @param {Element} container
   * @returns {Connection}
   */
  const connectionBetweenTwoNodes = (
    nodeFrom: Element,
    nodeTo: Element,
    container: Element,
  ): Connection => {
    const {
      left: containerLeft,
      top: containerTop,
    } = container.getBoundingClientRect()
    const boundsFrom = nodeFrom.getBoundingClientRect()
    const boundsTo = nodeTo.getBoundingClientRect()
    const coords = {
      fromLeft: boundsFrom.left + boundsFrom.width / 2 - containerLeft,
      fromTop: boundsFrom.top + boundsFrom.height / 2 - containerTop,
      toLeft: boundsTo.left + boundsTo.width / 2 - containerLeft,
      toTop: boundsTo.top + boundsTo.height / 2 - containerTop,
    }
    return {
      color: "#aaa",
      path: pathForCoordinates(coords),
    }
  }

  /**
   * Queries the DOM for elements matching the uuid supplied and returns an array of
   * Connection objects, each containing an svg path and stroke colour to be plotted.
   * Generates a connection
   * @param {string} uuid
   * @returns {Connection[]}
   */
  const refreshConnections = uuid => () => {
    const container = document.querySelector(`#${uuid}`)
    if (!container) {
      return []
    }
    return Array.from(document.querySelectorAll(`#${uuid} [data-connect-to]`))
      .map<Connection[]>(node => {
        const connectionData =
          node instanceof HTMLElement ? node.dataset.connectTo : undefined
        const fromIds = connectionData ? connectionData.split(" ") : []
        return fromIds.reduce<Connection[]>(
          (reducedConnections, connectionId) => {
            const connectedNode = document.querySelector(
              `#${uuid} [data-connect-id="${connectionId}"]`,
            )
            if (connectedNode instanceof HTMLElement) {
              return [
                ...reducedConnections,
                connectionBetweenTwoNodes(node, connectedNode, container),
              ]
            }
            return reducedConnections
          },
          [],
        )
      })
      .flat()
  }
  useEffect(() => {
    setConnections(refreshConnections(id))
  }, [])

  return (
    <svg width="100%" height="100%" className={styles.Container}>
      {connections.map(({ color, path }) => (
        <path
          key={path}
          d={path}
          fill="none"
          strokeWidth="2px"
          stroke={color}
        />
      ))}
    </svg>
  )
}
