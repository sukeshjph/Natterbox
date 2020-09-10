import React from "react"
import Paper from "@material-ui/core/Paper"
import { PortalTable } from "components/shared"
import { makeStyles } from "@material-ui/core/styles"
import { ArchivingEndpointColProps } from "./ArchivingEndpointColProps"
import { Endpoint } from "../../Archiving.type"

type ownProps = {
  allEndpoints: Endpoint[]
}

const endpointStyles = makeStyles({
  root: {
    height: "auto !important",
  },
})

export const ArchivingEndpoints = ({ allEndpoints }) => {
  const classes = endpointStyles()
  return (
    <Paper>
      <div>
        <PortalTable<Endpoint>
          objects={allEndpoints}
          showCheckBoxColumn={false}
          properties={ArchivingEndpointColProps}
          classes={[classes.root]}
        />
      </div>
    </Paper>
  )
}
