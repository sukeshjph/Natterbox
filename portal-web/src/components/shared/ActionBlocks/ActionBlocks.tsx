import React from "react"
import shortid from "shortid"
import IconButton from "@material-ui/core/IconButton"
import {
  DeleteIcon,
  DownloadIcon,
  FilterActiveIcon,
  FilterInactiveIcon,
  SettingsIcon,
  PlusIcon,
} from "../Images"
import styles from "./ActionBlocks.module.scss"

export enum ActionTypes {
  PREFERENCES = "Preferences",
  HIDEFILTER = "Hide Filter",
  CLEARFILTER = "Clear Filter",
  EXPORT = "Export",
  ADDNEW = "Add New",
  REMOVE = "Remove",
}

type OwnProps = {
  actions?: Record<ActionTypes, React.ReactElement>
  actionEvents?: Partial<Record<ActionTypes, () => void>>
  children?: React.ReactElement
}

export const defaultActions = {
  [ActionTypes.PREFERENCES]: <SettingsIcon />,
  [ActionTypes.HIDEFILTER]: <FilterActiveIcon />,
  [ActionTypes.CLEARFILTER]: <FilterInactiveIcon />,
  [ActionTypes.EXPORT]: <DownloadIcon />,
  [ActionTypes.ADDNEW]: <PlusIcon />,
  [ActionTypes.REMOVE]: <DeleteIcon />,
}

const getActionButtonWithEvent = (
  children: React.ReactElement,
  key: string,
  clickEvent?: (e: React.MouseEvent<HTMLButtonElement>) => void,
) => (
  <IconButton
    aria-label={key}
    onClick={clickEvent}
    className={styles.ActionIconButton}>
    {children}
  </IconButton>
)

export const ActionBlocks = ({
  actions = defaultActions,
  children,
  actionEvents,
}: OwnProps) => (
  <div className={styles.ActionContainer}>
    <div className={styles.ActionBlocks}>
      {Object.keys(actions).map(key => (
        <div
          className={styles.ActionBlock}
          key={shortid.generate()}
          onClick={(actionEvents || {})[key]}
          role="button"
          tabIndex={0}
          onKeyPress={(actionEvents || {})[key]}>
          {getActionButtonWithEvent(actions[key], key)}
          <span className={styles.ActionIconText}>{key}</span>
        </div>
      ))}
    </div>
    {children}
  </div>
)
