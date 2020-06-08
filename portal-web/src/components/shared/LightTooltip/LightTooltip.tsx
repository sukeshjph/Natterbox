import { makeStyles, Theme } from "@material-ui/core/styles"
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip"
import React from "react"

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: "11px",
    boxShadow: "1px 2px #888888",
  },
}))

export function LightTooltip(props: TooltipProps) {
  const classes = useStylesBootstrap()

  return <Tooltip arrow classes={classes} {...props} />
}
