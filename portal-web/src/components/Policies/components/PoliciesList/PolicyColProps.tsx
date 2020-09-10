import React from "react"
import { format, parseISO } from "date-fns"
import { Button } from "@material-ui/core"
import { IPolicy } from "../Policies.type"

export const PolicyColProps: IColType<IPolicy>[] = [
  {
    key: "name",
    label: "Name",
    show: true,
    render: (colData, row) => {
      const { id, name } = row
      const url = `/policies/${id}`
      return (
        <Button href={url} color="primary">
          {name}
        </Button>
      )
    },
  },
  {
    key: "type",
    label: "Type",
    show: true,
  },
  {
    key: "enabled",
    label: "Status",
    show: true,
    render: colData => {
      return colData ? "enabled" : "disabled"
    },
  },
  {
    key: "created",
    label: "Created",
    show: true,
    render: colData => format(parseISO(colData), "yyyy-MM-dd | HH:mm:ss"),
  },
  {
    key: "modified",
    label: "Last Updated",
    show: true,
    render: colData => format(parseISO(colData), "yyyy-MM-dd | HH:mm:ss"),
  },
]
