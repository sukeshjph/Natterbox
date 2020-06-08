import React, { useState } from "react"
import clsx from "clsx"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@mdi/react"
import { formatISO, parseISO } from "date-fns"
import { mdiChevronDown, mdiChevronUp } from "@mdi/js"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CallLogProps } from "./CallLogColProps"
import { UsersListDropDown } from "../../../shared"
import styles from "./CallLog.module.scss"
import { ISearchParams } from "./CallLogs.type"

type ownProps = {
  handleSearch(): void
  isSearching: boolean
}

const initialState = {
  startTime: "",
  endTime: "",
  fromUserId: "",
  fromNumber: "",
  toNumberDialled: "",
  connectedTo: "",
  connectedToNumber: "",
  uuid: "",
}

type SerachParamsType = Omit<ISearchParams, "fromUserId"> & {
  fromUserId: string
}

const TopContainer = {
  startTime: "Start Time",
  endTime: "End Time",
}

export const CallLogSearch = ({ handleSearch, isSearching }) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [searchState, setSearchState] = useState<SerachParamsType>(initialState)
  const [usersLoading, setUsersLoading] = useState(true)

  const colsObj = [
    ...CallLogProps.filter(obj =>
      [
        "fromNumber",
        "toNumberDialled",
        "connectedTo",
        "connectedToNumber",
      ].includes(obj.key),
    ),
    {
      key: "uuid",
      label: "Uuid",
    },
  ]

  const updateField = (fieldType: string) => e => {
    if (["startTime", "endTime"].includes(fieldType)) {
      setSearchState({
        ...searchState,
        [fieldType]: e ? formatISO(e) : e,
      })
    } else if (fieldType === "fromUserId") {
      setSearchState({
        ...searchState,
        [fieldType]: e ? e.value : null,
      })
    } else {
      setSearchState({
        ...searchState,
        [fieldType]: e.target.value,
      })
    }
  }

  const handleLocalSearch = () =>
    handleSearch(
      Object.keys(searchState)
        .filter(key => searchState[key])
        .reduce((acc, curKey) => {
          let value = searchState[curKey]

          if (curKey === "fromUserId") {
            value = parseInt(value, 10)
          }
          return {
            ...acc,
            [curKey]: value,
          }
        }, {}),
    )

  const handlePanelChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ) => setExpanded(isExpanded ? panel : false)

  return (
    <div>
      <ExpansionPanel onChange={handlePanelChange("exPnl")}>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          className={styles.expansionPanelSummary}>
          <div className={styles.expansionPanelSummaryContent}>
            <IconButton aria-label="close" size="medium">
              <Icon
                path={expanded ? mdiChevronDown : mdiChevronUp}
                size={1}
                horizontal
                vertical
                color="black"
              />
            </IconButton>
            <span>Search Criteria</span>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormGroup className={styles.searchFormGroup}>
            <div className={styles.topContainer}>
              {Object.keys(TopContainer).map(key => (
                <FormControl
                  margin="normal"
                  className={clsx(styles.formControl, styles.topItemContainer)}>
                  <span className={styles.topLabel}>{TopContainer[key]}</span>
                  <DatePicker
                    selected={
                      searchState[key] ? parseISO(searchState[key]) : null
                    }
                    onChange={updateField(key)}
                    isClearable
                  />
                </FormControl>
              ))}
              <UsersListDropDown
                handleUserChange={updateField("fromUserId")}
                usersLoaded={() => setUsersLoading(false)}
                classes={{
                  formControl: clsx(
                    styles.formControl,
                    styles.topItemContainer,
                    styles.userSelect,
                  ),
                  formLabel: styles.topLabel,
                }}
              />
            </div>

            <div className={styles.nonDateLogContainer}>
              {colsObj.map(col => (
                <FormControl
                  margin="normal"
                  className={clsx(styles.formControl, styles.item)}>
                  <TextField
                    id={col.key}
                    label={col.label}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={updateField(col.key)}
                    InputProps={{
                      className: styles.textControl,
                    }}
                  />
                </FormControl>
              ))}
            </div>
            <Button
              color="primary"
              variant="contained"
              className={styles.submitButton}
              onClick={handleLocalSearch}
              disabled={isSearching || usersLoading}>
              {isSearching ? "Searching" : "Search"}
            </Button>
          </FormGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
