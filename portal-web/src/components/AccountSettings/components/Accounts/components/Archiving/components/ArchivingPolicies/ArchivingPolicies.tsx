import React from "react"
import Paper from "@material-ui/core/Paper"
import Spinner from "react-spinkit"
import { PortalTable, ActionBlocks, ActionTypes } from "components/shared"
import { makeStyles } from "@material-ui/core/styles"
import { ArchivingColProps } from "./ArchivingColProps"
import { OrgPolicy } from "../../Archiving.type"
import { CreatePolicy } from "./CreatePolicy/CreatePolicy"
import { useArchivingPoliciesHook } from "./useArchivingPoliciesHook"

const archivingStyles = makeStyles({
  root: {
    height: "auto !important",
  },
})

export const ArchivingPolicies = () => {
  const classes = archivingStyles()

  const {
    showAddPolicy,
    handleShowAddPolicy,
    loading,
    data,
    refetch,
  } = useArchivingPoliciesHook()

  const actions = {
    [ActionTypes.CLEARFILTER]: {
      visible: false,
    },
    [ActionTypes.ADDNEW]: {
      event: () => handleShowAddPolicy(true),
      label: "Add New Policy",
    },
    [ActionTypes.HIDEFILTER]: {
      visible: false,
    },
    [ActionTypes.EXPORT]: {
      visible: false,
    },
    [ActionTypes.REMOVE]: {
      visible: false,
    },
  }

  return (
    <Paper>
      <div>
        {loading && <Spinner name="ball-spin-fade-loader" />}
        {showAddPolicy && (
          <CreatePolicy
            closeDialog={() => handleShowAddPolicy(false)}
            refetch={() => refetch()}
          />
        )}
        {!loading && (
          <>
            <ActionBlocks actions={actions} />
            <PortalTable<OrgPolicy>
              objects={data.orgPolicies}
              showCheckBoxColumn={false}
              properties={ArchivingColProps}
              classes={[classes.root]}
            />
          </>
        )}
      </div>
    </Paper>
  )
}
