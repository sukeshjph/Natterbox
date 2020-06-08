import React, { useState, useEffect } from "react"
import { isNil, isEmpty } from "ramda"
import { useLazyQuery } from "@apollo/react-hooks"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormGroup from "@material-ui/core/FormGroup"
import styles from "./Accounts.module.scss"
import { CompRender } from "../../../shared"
import { GeneralSettings } from "./components/GeneralSettings"
import { GET_ACCOUNT_SETTINGS } from "./AccountQueries"

enum settingTypes {
  GSettings = "generalSettings",
  SeSettings = "securitySettings",
}

const settingsSelect = {
  [settingTypes.GSettings]: "General Settings",
  [settingTypes.SeSettings]: "Security Settings",
}

export const Accounts = () => {
  const [errorSnack, setErrorSnack] = useState(false)
  const [settingsType, setSettingsType] = useState(settingTypes.GSettings)
  const [
    loadGeneralSettings,
    { called, loading, error, data: gSettingsdata, refetch },
  ] = useLazyQuery(GET_ACCOUNT_SETTINGS)

  useEffect(() => {
    loadGeneralSettings()
  }, [])

  const handleChange = event => {
    const type = event.target.value
    setSettingsType(type)

    if (type === settingTypes.GSettings) {
      loadGeneralSettings()
    }

    // if (settingsType === "securitySettings") {
    // }
  }

  const toShowGeneralSettings =
    called &&
    !loading &&
    !error &&
    !isNil(gSettingsdata) &&
    !isEmpty(gSettingsdata)

  return (
    <CompRender
      showError={error! && !errorSnack}
      baseClass="Accounts"
      showLoading={called && loading}
      error={error}
      handleErrorClose={() => setErrorSnack(true)}
      render={() => (
        <div className={styles.root}>
          <FormGroup>
            <FormControl>
              <Select
                labelId="settings-select"
                id="settings-select-id"
                value={settingsType}
                className={styles.settingsDropdown}
                onChange={handleChange}>
                {Object.keys(settingsSelect).map(key => (
                  <MenuItem value={key}>{settingsSelect[key]}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {toShowGeneralSettings && (
              <GeneralSettings
                gSettings={gSettingsdata.generalSettings}
                numbers={gSettingsdata.numbers}
                refetchSettings={refetch}
              />
            )}
          </FormGroup>
        </div>
      )}
    />
  )
}
