import { useAuth0 } from "plugins/auth0"
import { getDecodedTokenValues } from "../util"

export const useSapienProxyData = () => {
  const { userToken, sapienUrl } = useAuth0()
  const data = getDecodedTokenValues(userToken!)
  const orgIdKey = Object.keys(data).find(key => key.includes("orgId"))
  const orgId = orgIdKey ? data[orgIdKey] : ""

  return {
    orgId,
    sapienUrl,
    userToken,
  }
}
