import { IGroup } from "./Groups.type"

export const GroupColProps: IColType<IGroup>[] = [
  {
    key: "id",
    label: "id",
    show: true,
  },
  {
    key: "sipExtension",
    label: "Sip Extension",
    show: true,
  },
  {
    key: "name",
    label: "Name",
    show: true,
  },
  {
    key: "category",
    label: "Category",
    show: true,
  },
  {
    key: "system",
    label: "System",
    show: true,
    render: colData => {
      if (colData) return "Yes"
      return "No"
    },
  },
]
