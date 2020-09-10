/* Declaration merging to extend types from node or custom modules */

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

/* Don't import them otherwise this file won't remain global */

enum filterDataTypes {
  String = "string",
  Number = "number",
  DateTime = "dateTime",
  Choice = "choice",
}

enum filterCompareTypes {
  LessThan = "Less Than",
  GreaterThan = "Greater Than",
  Equal = "Equal",
  Like = "Like",
  Contains = "Contains",
}

/*  Interfaces declared here are global */

interface IColType<T> {
  key: keyof T
  colType?: filterDataTypes
  label: string
  show?: boolean
  render?: (
    colData: any,
    row?: any,
    key?: string,
  ) => string | React.ReactElement
  filterable?: boolean
}

interface IFilterType {
  colType: filterDataTypes
  key: string
  value: any
  filterable?: boolean
  handleColFilterChange: (
    value: any,
    colType: filterDataTypes,
    compareType: filterCompareTypes,
  ) => void
  options?: any[]
}

interface IPager {
  hasMore: boolean
  firstIndex: number
  lastIndex: number
  prevIndex: number
  nextIndex: number
  count: number
}

interface IDevice {
  id: string
  sipExtension: null | string
  description: null | string
  location: null | string
  enabled: boolean
  password?: null
  macAddress: string
  registered: boolean
  registrationExpiry: Date
}

interface IUser {
  userId: number
  firstName: string
  lastName: string
  userName: string
  middleNames: string
  sipExtension: string
  primaryMobileNumber: string
  permissionLevel: string
  previousLogin: string
  enabled: Boolean
  primaryGroupId: string
  availabilityProfileId: string
  availabilityStateId: string
  memberOf: string[]
  sipDevices: number[]
  pciEnabled: Boolean
  scopes: string[]
  loggedIn: boolean
}

interface ServerError extends Error {
  response: Response
  result: Record<string, any>
  statusCode: number
}
