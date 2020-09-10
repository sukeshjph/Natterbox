import React, { useState } from "react"
import { splitEvery } from "ramda"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Portal from "@material-ui/core/Portal"
import IconButton from "@material-ui/core/IconButton"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import { SettingsIcon } from "../Images"
import styles from "./Preferences.module.scss"

type ownProps<T> = {
  columns: IColType<T>[]
  handlePrefChange: (inputCols: IColType<T>[]) => void
  showFilter?: (chkValue: boolean) => void
  filterRowVisible?: boolean
}

export function Preferences<T>({
  columns,
  handlePrefChange,
  showFilter,
  filterRowVisible = false,
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [localColumns, setLocalColumns] = useState(columns)
  const [filterCheckBox, setFilterCheckbox] = useState(filterRowVisible)

  const handlePortalClick = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const container = React.useRef(null)

  const splitColumns = splitEvery(2, localColumns)

  const handleCheckBoxChange = (key: string) => event => {
    setLocalColumns(
      localColumns.map(col =>
        col.key === key
          ? {
              ...col,
              show: event.target.checked,
            }
          : col,
      ),
    )
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div
        className={styles.ActionBlock}
        onClick={handlePortalClick}
        onKeyPress={handlePortalClick}
        role="button"
        tabIndex={0}>
        <IconButton
          aria-label="Preferences"
          onClick={handlePortalClick}
          className={styles.ActionIconButton}>
          <SettingsIcon />
        </IconButton>
        <span className={styles.ActionIconText}>Preferences</span>
      </div>

      <div ref={container} className={styles.PrefContainer} />

      {anchorEl && (
        <ClickAwayListener onClickAway={handleClose}>
          <Portal container={container.current}>
            <Paper className={styles.prefContent}>
              <FormGroup>
                <div className={`${styles.row} ${styles.prefHeading}`}>
                  <div className={styles.column}>Columns to show:</div>
                </div>
                {splitColumns.map(row => (
                  <div className={styles.row}>
                    {row.map((column: any) => (
                      <div className={styles.column}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={column.key}
                              checked={column.show}
                              onChange={handleCheckBoxChange(column.key)}
                            />
                          }
                          label={column.label}
                        />
                      </div>
                    ))}
                  </div>
                ))}
                <div className={`${styles.row} ${styles.prefHeading}`}>
                  <div className={styles.column}>Preferences:</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column}>
                    {" "}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filterCheckBox}
                          onClick={(event: any) =>
                            setFilterCheckbox(event.target.checked)
                          }
                        />
                      }
                      label="Show Filter"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column}>
                    <div className={styles.pageCount}>
                      <input type="text" />
                      <span>Records Per Page</span>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column} />

                  <div className={styles.column}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={styles.submitButton}
                      onClick={() => {
                        handlePrefChange(localColumns)
                        handleClose()
                        if (showFilter) {
                          showFilter(filterCheckBox)
                        }
                      }}>
                      Apply Preferences
                    </Button>
                  </div>
                </div>
              </FormGroup>
            </Paper>
          </Portal>
        </ClickAwayListener>
      )}
    </>
  )
}
