import {
  validatePhoneForE164,
  getDecodedTokenValues,
  getCamelCaseString,
  getHourMinutesSeconds,
  getColValueWithDefault,
} from "./util"

export {
  validatePhoneForE164,
  getDecodedTokenValues,
  getCamelCaseString,
  getHourMinutesSeconds,
  getColValueWithDefault,
}

export const getUserId = (tokenObject: any) => {
  const foundUserKey = Object.keys(tokenObject).find(key =>
    key.includes("/userId"),
  )

  if (foundUserKey) {
    return tokenObject[foundUserKey]
  }

  return ""
}
