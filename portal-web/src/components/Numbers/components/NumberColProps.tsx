import { isEmpty, isNil } from "ramda"
import { INumber } from "./Number.type"

export const NumberColProps: IColType<INumber>[] = [
  {
    key: "label",
    label: "Label",
    show: true,
  },
  {
    key: "countryCode",
    label: "Country Code",
    show: true,
  },
  {
    key: "number",
    label: "Number",
    show: true,
  },
  {
    key: "userId",
    label: "DDI",
    show: true,
    render: colData => (isEmpty(colData) || isNil(colData) ? "No" : "Yes"),
  },
]
