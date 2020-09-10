import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { GET_ALL_POLICIES } from "../../ArchivingQueries"

export const useArchivingPoliciesHook = () => {
  const [showAddPolicy, setShowAddPolicy] = useState(false)

  const { loading, error, data, refetch } = useQuery(GET_ALL_POLICIES, {
    notifyOnNetworkStatusChange: true,
  })

  const handleShowAddPolicy = (value: boolean) => setShowAddPolicy(value)

  return {
    showAddPolicy,
    handleShowAddPolicy,
    loading,
    error,
    data,
    refetch,
  }
}
