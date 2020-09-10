import { isNil } from "ramda"
import { Base64 } from "js-base64"

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

export const getDecodedTokenValues = (userToken: string) => {
  const s = userToken?.split(".")
  const details = s && Base64.decode(s[1])
  const data = details && JSON.parse(details)
  return data
}

export const validatePhoneForE164 = phoneNumber => {
  const regEx = /^\+[1-9]\d{10,14}$/

  return regEx.test(phoneNumber)
}
