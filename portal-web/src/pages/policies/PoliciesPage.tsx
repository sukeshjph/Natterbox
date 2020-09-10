import React from "react"
import { NoTabTable } from "../../components/shared"
import { PoliciesList } from "../../components/Policies/components/PoliciesList/PoliciesList"
import { PolicyEditor } from "../../components/Policies/components/PolicyEditor/PolicyEditor"

const PoliciesPage: React.FC<{ match: { params } }> = React.memo(props => {
  const {
    match: { params },
  } = props

  return params.policyId ? (
    <PolicyEditor policyId={params.policyId} />
  ) : (
    <NoTabTable>
      <PoliciesList />
    </NoTabTable>
  )
})

export default PoliciesPage
