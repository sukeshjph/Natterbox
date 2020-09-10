import { omit, pluck, remove } from "ramda"

// our libs
import { actions } from "./VoicemailActions"

export const VoicemailMiddleware = (dispatch: Function) => (
  action: any,
  state: any,
) => {
  const enhancedAction = {
    ...action,
  }

  switch (action.type) {
    case actions.SUBMITHANDLER: {
      // @ts-ignore
      const userIDs = pluck("userId", state.usersCache)

      state
        .updateVoicemail({
          variables: {
            id: state.userId,
            voicemail: {
              ...omit(["__typename"], state.voicemail),
              ccMailboxes: {
                users: [...userIDs.map(x => +x)],
              },
            },
          },
        })
        .catch(() => {})

      break
    }
    case actions.UPDATEFIELD: {
      if (action.payload.target.type === "checkbox") {
        enhancedAction.payload = {
          [action.payload.target.name]: action.payload.target.checked,
        }
      } else {
        enhancedAction.payload = {
          [action.payload.target.name]: action.payload.target.value,
        }
      }
      break
    }
    case actions.ADDEMAILTO: {
      enhancedAction.payload = [...state.voicemail.emailTo, action.payload]
      break
    }
    case actions.DELETEEMAILTO: {
      enhancedAction.payload = remove(
        action.payload.index,
        1,
        state.voicemail.emailTo,
      )
      break
    }
    default:
      break
  }

  dispatch(enhancedAction)
}
