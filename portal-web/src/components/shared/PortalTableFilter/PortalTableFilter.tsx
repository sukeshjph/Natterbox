/* eslint-disable react/jsx-curly-brace-presence */
import React from "react"
import { isEmpty } from "ramda"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import DatePicker from "react-datepicker"
import styles from "./PortalTableFilter.module.scss"
import { filterDataTypes, filterCompareTypes } from "../../../common.types"
import { getCamelCaseString } from "../../../util"

type ownProps = {
  filterObjects: IFilterType[]
}

export const PortalTableFilter: React.FC<ownProps> = React.memo(
  ({ filterObjects }) => {
    const [compareType, setCompareType] = React.useState(
      filterCompareTypes.Equal,
    )

    const getFilterComp = ({
      colType,
      filterable,
      value,
      handleColFilterChange,
      options: colOptions,
    }: IFilterType) => {
      if (!filterable) {
        return <span />
      }

      if (
        colType === filterDataTypes.String ||
        colType === filterDataTypes.Number
      ) {
        return (
          <input
            type="text"
            value={value}
            onChange={(event: any) =>
              handleColFilterChange(
                event.target.value,
                colType,
                filterCompareTypes.Contains,
              )
            }
          />
        )
      }

      if (colType === filterDataTypes.Choice) {
        return (
          <select
            onChange={(event: any) =>
              handleColFilterChange(
                event.target.value,
                colType,
                filterCompareTypes.Equal,
              )
            }
            value={value}>
            <option value="All">All</option>
            {colOptions
              ? colOptions.map(colOption => (
                  <option value={colOption}>
                    {getCamelCaseString(colOption)}
                  </option>
                ))
              : null}
          </select>
        )
      }

      if (colType === filterDataTypes.DateTime) {
        return (
          <div className={styles.dateTimeContainer}>
            <select
              onChange={(event: any) => setCompareType(event.target.value)}>
              <option value={filterCompareTypes.Equal}>{"="}</option>
              <option value={filterCompareTypes.LessThan}>{"<"}</option>
              <option value={filterCompareTypes.GreaterThan}>{">"}</option>
            </select>
            <DatePicker
              isClearable
              className={styles.datePicker}
              selected={value}
              disabled={isEmpty(compareType)}
              onChange={(event: any) =>
                handleColFilterChange(event, colType, compareType)
              }
            />
          </div>
        )
      }

      return <input type="text" readOnly />
    }

    return (
      <TableRow tabIndex={-1}>
        <TableCell className={styles.portalHeaderCheckbox} />
        {filterObjects.map((property: IFilterType) => (
          <TableCell
            id={String(property.key)}
            className={styles.portalHeaderFilterCell}
            align="left">
            {getFilterComp(property)}
          </TableCell>
        ))}
      </TableRow>
    )
  },
)
