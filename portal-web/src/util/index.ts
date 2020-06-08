import { isNil } from "ramda"

export const getColValueWithDefault = (colvalue: string) => {
  if (isNil(colvalue)) return ""
  if (colvalue === "undefined undefined") return ""
  return colvalue
}

export const getHourMinutesSeconds = (secondsDiff: number) => {
  let expirationTimeLeft = ""
  let seconds = secondsDiff
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  hours -= days * 24
  minutes = minutes - days * 24 * 60 - hours * 60
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60

  if (hours !== 0) {
    expirationTimeLeft = `${hours} hours:`
  }

  if (minutes !== 0) {
    expirationTimeLeft = `${expirationTimeLeft}${minutes} minutes:`
  }

  if (seconds !== 0) {
    expirationTimeLeft = `${expirationTimeLeft}${seconds} seconds`
  }

  return expirationTimeLeft.trim()
}

export const getCamelCaseString = (inputStr: string) => {
  if (inputStr) {
    return `${inputStr.slice(0, 1).toUpperCase()}${inputStr
      .slice(1)
      .toLowerCase()}`
  }
  return ""
}
