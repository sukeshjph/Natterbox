import React from "react"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import AppBar from "@material-ui/core/AppBar"
import InputBase from "@material-ui/core/InputBase"
import Icon from "@mdi/react"
import { mdiMagnify } from "@mdi/js"
import { NavLink } from "react-router-dom"
import { tabStyles, tabsStyles } from "./HeaderMUIStyles"
import { Login } from "../Login/Login"
import styles from "./Header.module.scss"
import { AccountIcon } from "../Images"

type headerProps = {
  location: {
    pathname: string
  }
}

const PagesLinks = {
  Home: "/home",
  Logs: "/logs",
  "Account settings": "/accounts",
  Users: "/users",
  Groups: "/groups",
  Devices: "/devices",
  Numbers: "/numbers",
  Policies: "/policies",
}

export const Header = ({ location }: headerProps) => {
  const tabClasses = tabStyles()
  const tabsClasses = tabsStyles()

  return (
    <AppBar position="static" className={styles.root}>
      <div id="header-main" className={styles.header}>
        <div className={styles.upperHeader}>
          <div className={styles.buttonGreen}>
            <AccountIcon />
            Brightec
          </div>
          <h2>Natterbox</h2>
          <Login />
        </div>
        <div className={styles.lowerHeader}>
          <Tabs
            value={location.pathname}
            classes={{
              root: tabsClasses.root,
            }}>
            {Object.keys(PagesLinks).map(pageKey => (
              <Tab
                label={pageKey}
                component={NavLink}
                to={PagesLinks[pageKey]}
                className={`${styles.tabLink} ${
                  location.pathname === PagesLinks[pageKey]
                    ? `${styles.tabLinkSelected}`
                    : ""
                }`}
                classes={{
                  root: tabClasses.root,
                }}
              />
            ))}
          </Tabs>
          <Paper className={styles.headerSearch}>
            <InputBase
              className={styles.inputTextWithIconLarge}
              placeholder="Search Org…"
              inputProps={{ "aria-label": "search" }}
            />
            <div>
              <Icon path={mdiMagnify} size={1} />
            </div>
          </Paper>
        </div>
      </div>
    </AppBar>
  )
}
