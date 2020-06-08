import { isEmpty, isNil } from "ramda"
import { INumber } from "./Number.type"

export const NumberColProps: IColType<INumber>[] = [
  {
    key: "label",
    label: "Label",
  },
  {
    key: "countryCode",
    label: "Country Code",
  },
  {
    key: "number",
    label: "Number",
  },
  {
    key: "userId",
    label: "DDI",
    render: colData => (isEmpty(colData) || isNil(colData) ? "No" : "Yes"),
  },
]
