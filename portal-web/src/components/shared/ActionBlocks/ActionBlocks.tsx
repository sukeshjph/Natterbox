import React from "react"
import shortid from "shortid"
import { isNil, mergeDeepRight } from "ramda"
import IconButton from "@material-ui/core/IconButton"
import {
  DeleteIcon,
  DownloadIcon,
  FilterActiveIcon,
  FilterInactiveIcon,
  SettingsIcon,
  PlusIcon,
  SearchIcon,
} from "../Images"
import styles from "./ActionBlocks.module.scss"

export enum ActionTypes {
  SEARCH = "Search",
  PREFERENCES = "Preferences",
  HIDEFILTER = "Hide Filter",
  SHOWFILTER = "Show Filter",
  CLEARFILTER = "Clear Filter",
  EXPORT = "Export",
  ADDNEW = "Add New",
  REMOVE = "Remove",
}

type actionPropsType = {
  visible?: boolean
  disable?: boolean
  image?: React.ReactElement
  label?: string
  event?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type OwnProps = {
  actions?: Partial<Record<ActionTypes, actionPropsType>>
  children?: React.ReactElement
  preferences?: React.ReactNode
}

export const defaultActions = {
  [ActionTypes.SEARCH]: {
    visible: false,
    disable: false,
    image: <SearchIcon />,
    event: () => undefined,
  },
  [ActionTypes.PREFERENCES]: {
    visible: true,
    disable: false,
    image: <SettingsIcon />,
    event: () => undefined,
  },
  [ActionTypes.HIDEFILTER]: {
    visible: true,
    disable: false,
    image: <FilterActiveIcon />,
    event: () => undefined,
  },
  [ActionTypes.SHOWFILTER]: {
    visible: false,
    disable: false,
    image: <FilterActiveIcon />,
    event: () => undefined,
  },
  [ActionTypes.CLEARFILTER]: {
    visible: true,
    disable: false,
    image: <FilterInactiveIcon />,
    event: () => undefined,
  },
  [ActionTypes.EXPORT]: {
    visible: true,
    disable: false,
    image: <DownloadIcon />,
    event: () => undefined,
  },
  [ActionTypes.ADDNEW]: {
    visible: true,
    disable: false,
    image: <PlusIcon />,
    event: () => undefined,
  },
  [ActionTypes.REMOVE]: {
    visible: true,
    disable: false,
    image: <DeleteIcon />,
    event: () => undefined,
  },
}

const getActionButtonWithEvent = (
  childrenObj: actionPropsType,
  key: string,
  clickEvent?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
) => (
  <IconButton
    aria-label={key}
    onClick={clickEvent}
    className={styles.ActionIconButton}
    disabled={disabled}>
    {childrenObj.image}
  </IconButton>
)

export const ActionBlocks = ({ actions, children, preferences }: OwnProps) => {
  const updatedActions = isNil(actions)
    ? defaultActions
    : mergeDeepRight(defaultActions, actions)

  return (
    <div className={styles.ActionContainer}>
      <div className={styles.ActionBlocks}>
        {Object.keys(updatedActions).map(key => {
          if (preferences && key === ActionTypes.PREFERENCES) {
            return <>{preferences}</>
          }

          const actionBlockElement = updatedActions[key]

          return (
            actionBlockElement.visible && (
              <div
                className={styles.ActionBlock}
                key={shortid.generate()}
                onClick={actionBlockElement.event}
                role="button"
                tabIndex={0}
                onKeyPress={actionBlockElement.event}>
                {getActionButtonWithEvent(
                  updatedActions[key],
                  key,
                  actionBlockElement.event,
                  actionBlockElement.disabled,
                )}
                <span className={styles.ActionIconText}>
                  {actionBlockElement.label ? actionBlockElement.label : key}
                </span>
              </div>
            )
          )
        })}
      </div>
      {children}
    </div>
  )
}
