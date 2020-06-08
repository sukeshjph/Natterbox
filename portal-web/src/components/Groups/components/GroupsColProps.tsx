import { IGroup } from "./Groups.type"

export const GroupColProps: IColType<IGroup>[] = [
  {
    key: "id",
    label: "id",
  },
  {
    key: "sipExtension",
    label: "Sip Extension",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "system",
    label: "System",
    render: colData => {
      if (colData) return "Yes"
      return "No"
    },
  },
]
