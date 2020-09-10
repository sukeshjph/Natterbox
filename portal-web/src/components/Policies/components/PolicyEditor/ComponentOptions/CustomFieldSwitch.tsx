import Switch from "@material-ui/core/Switch"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import transitions from "@material-ui/core/styles/transitions"
import styles from "./ComponentOptions.module.scss"

const portalSwitchStyles = makeStyles({
  root: {
    width: 70,
    height: 32,
    padding: 0,
    margin: 16,
  },
  switchBase: {
    padding: 1,
    color: "#5c6770",
    content: "Off",
    "&$checked": {
      transform: "translateX(37px)",
      color: "#5c6770",
      "& + $track": {
        backgroundColor: "#c4d600",
        opacity: 1,
        "&:before": {
          opacity: 1,
        },
        "&:after": {
          opacity: 0,
        },
      },
    },
  },
  thumb: {
    width: 24,
    height: 24,
    margin: 3,
  },
  track: {
    borderRadius: 32 / 2,
    backgroundColor: "#dddddd",
    opacity: 1,
    transition: transitions.create(["background-color", "border"]),
    position: "relative",
    "&:before, &:after": {
      display: "inline-block",
      position: "absolute",
      top: "50%",
      width: "50%",
      transform: "translateY(-50%)",
      color: "#49535c",
      textAlign: "center",
    },
    "&:before": {
      content: '"On"',
      left: 4,
      opacity: 0,
    },
    "&:after": {
      content: '"Off"',
      right: 4,
      opacity: 1,
    },
  },
  checked: {},
})

export const CustomFieldSwitch = props => {
  const { value, label, description } = props
  const switchStyles = portalSwitchStyles()
  return (
    <div className={styles.switchContainer}>
      <div className={styles.switchLabel}> {label}</div>
      <Switch
        classes={switchStyles}
        checked={value}
        onChange={() => props.onChange(!value)}
      />
      <p>{description}</p>
    </div>
  )
}
