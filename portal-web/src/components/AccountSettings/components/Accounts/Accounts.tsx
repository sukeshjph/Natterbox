import React, { useState } from "react"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormGroup from "@material-ui/core/FormGroup"
import styles from "./Accounts.module.scss"
import AllSettings from "./components/AllSettings"
import SoundList from "./components/Sound"
import { ViewArchiving } from "./components/Archiving"

enum settingTypes {
  GSettings = "generalSettings",
  SeSettings = "securitySettings",
  Sound = "Sound",
  ARCHIVING = "Archiving",
}

const settingsSelect = {
  [settingTypes.GSettings]: "General Settings",
  [settingTypes.SeSettings]: "Security Settings",
  [settingTypes.Sound]: "Sound",
  [settingTypes.ARCHIVING]: "Archiving",
}

const compToLoad = {
  [settingTypes.GSettings]: <AllSettings />,
  [settingTypes.Sound]: <SoundList />,
  [settingTypes.ARCHIVING]: <ViewArchiving />,
}

export const Accounts = () => {
  const [settingsType, setSettingsType] = useState(settingTypes.GSettings)

  const handleChange = event => setSettingsType(event.target.value)

  return (
    <div>
      <FormGroup>
        <FormControl
          margin="normal"
          className={styles.settingsDropdownContainer}>
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
        {compToLoad[settingsType]}
      </FormGroup>
    </div>
  )
}
