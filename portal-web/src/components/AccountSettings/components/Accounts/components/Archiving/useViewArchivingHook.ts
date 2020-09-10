import { useReducer } from "react"
import { useQuery } from "@apollo/react-hooks"
import * as ViewArchivingActions from "./ViewArchivingActions"
import { GET_POLICIES_ENDPOINTS } from "./ArchivingQueries"
import {
  initialArchingState,
  ViewArchivingReducer,
} from "./ViewArchivingReducer"

const policyTypeMap = {
  recording: "callRecordingPolicy",
  "buffered-recording": "bufferedRecordingPolicy",
  sms: "smsPolicy",
  info: "cdrPolicy",
}

export const useViewArchivingHook = () => {
  const [state, dispatch] = useReducer(
    ViewArchivingReducer,
    initialArchingState,
  )

  const { loading, error, data, refetch } = useQuery(GET_POLICIES_ENDPOINTS, {
    onCompleted(policyData) {
      if (policyData && policyData.defaultPolicies) {
        dispatch(
          ViewArchivingActions.setInitialDefaultPolicies(
            policyData.defaultPolicies.reduce(
              (acc, curPolObj) => ({
                ...acc,
                [policyTypeMap[curPolObj.Type]]: curPolObj.PolicyID,
              }),
              {},
            ),
          ),
        )
      }
    },
    notifyOnNetworkStatusChange: true,
  })

  const handleDefaultPolicySelectChange = (policyType: string) => e =>
    dispatch(
      ViewArchivingActions.setDefaultPolicy({ [policyType]: e.target.value }),
    )

  const handleRemoveError = () => dispatch(ViewArchivingActions.removeError())

  return {
    refetch,
    state,
    data,
    loading,
    error,
    handleRemoveError,
    handleDefaultPolicySelectChange,
  }
}
