import { omit } from "ramda"

// our libs
import { actions } from "./GeneralSettingsActions"
import {
  DirectNotifications,
  LogCompliance,
  TwoFactorAuth,
} from "./GeneralSettings.type"

export const GeneralSettingsMiddleware = (dispatch: Function) => (
  action: any,
  state: any,
) => {
  const enhancedAction = {
    ...action,
  }

  switch (action.type) {
    case actions.SUBMITHANDLER:
      state
        .updateGeneralSettings({
          variables: {
            id: state.generalSettings.orgId,
            settings: {
              ...omit(["__typename", "orgId"], state.generalSettings),
            },
          },
        })
        .catch(() => {})
      break
    case actions.UPDATEFIELD:
      if (action.payload.target.type === "checkbox") {
        switch (action.payload.target.name) {
          case "directNotifications":
            enhancedAction.payload = {
              [action.payload.target.name]: action.payload.target.checked
                ? DirectNotifications.YES
                : DirectNotifications.NO,
            }
            break
          case "logCompliance":
            enhancedAction.payload = {
              [action.payload.target.name]: action.payload.target.checked
                ? LogCompliance.YES
                : LogCompliance.NO,
            }
            break
          case "twoFactorAuth":
            enhancedAction.payload = {
              [action.payload.target.name]: action.payload.target.checked
                ? TwoFactorAuth.MANDATORY
                : TwoFactorAuth.OPTIONAL,
            }
            break
          default:
            break
        }
      } else {
        enhancedAction.payload = {
          [action.payload.target.name]: action.payload.target.value,
        }
      }
      break
    default:
      break
  }

  dispatch(enhancedAction)
}
