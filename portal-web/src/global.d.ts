declare module "*.module.scss" {
  const classes: { [key: string]: string }
  export default classes
}
declare module "*.svg" {
  import React = require("react")
  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  >>
  const src: string
  export default src
}

declare let process: {
  env: {
    NODE_ENV: string
  }
}

enum filterDataTypes {
  String = "string",
  Number = "number",
  DateTime = "dateTime",
  Choice = "choice",
}

interface IColType<T> {
  key: keyof T
  label: string
  render?: (colData: any) => string | React.ReactElement
}

interface IFilterType {
  colType: filterDataTypes
  key: string
  value: any
  options?: any[]
}
