import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import React from "react"
import { FormGroup, InputLabel, MenuItem } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField/TextField"
import Select from "@material-ui/core/Select"
import Button from "@material-ui/core/Button"
import styles from "../Policies.module.scss"
import { PolicyTypeOption, PolicyOptionsType } from "../Policies.type"
import { useMutablePolicyOptionsHooks } from "./PolicyOptionsHooks"

type OwnProps = {
  drawerState: boolean
  onUpdate: (policyOptions: PolicyOptionsType) => void
  policyOptions: PolicyOptionsType
}

export const PolicyOptions = (props: OwnProps) => {
  const { drawerState, onUpdate } = props
  const {
    policyOptions,
    onChangeName,
    onChangeType,
    onChangeEnabledState,
    /* eslint-disable react/destructuring-assignment */
  } = useMutablePolicyOptionsHooks(props.policyOptions)

  const handleNameFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeName(event.target.value as string)

  const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>) =>
    onChangeType(event.target.value as string)

  const handleChangeEnabledState = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => onChangeEnabledState(event.target.value as boolean)

  const handleEditPermissionsClicked = () => {
    // TODO
  }

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={drawerState}
        onClose={() => onUpdate(policyOptions)}
        onOpen={() => {}}
        classes={{
          root: styles.root,
          paper: styles.policyOptionsPaper,
        }}>
        <div className={styles.policyOptionsContent}>
          <div className={styles.policyOptionsHeader}>
            <h4>Policy Options</h4>
            <Button
              color="default"
              variant="outlined"
              onClick={handleEditPermissionsClicked}>
              Edit Permissions
            </Button>
          </div>
          <FormGroup>
            <FormControl variant="outlined">
              <InputLabel id="selectTypeLabel">Type</InputLabel>
              <Select
                labelId="typeDropdownLabel"
                id="typeDropDown"
                value={policyOptions.type}
                onChange={handleChangeType}
                label="Type">
                <MenuItem value={PolicyTypeOption.CALL}>Call</MenuItem>
                <MenuItem value={PolicyTypeOption.NON_CALL}>Non Call</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                id="name"
                label="Policy Name"
                margin="normal"
                value={policyOptions.name}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleNameFieldChanged}
                InputProps={{
                  className: styles.textControl,
                }}
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel id="selectStatusLabel">Status</InputLabel>
              <Select
                labelId="statusDropdownLabel"
                id="statusDropDown"
                value={policyOptions.enabled}
                onChange={handleChangeEnabledState}
                label="Type">
                <MenuItem value="true">Enabled</MenuItem>
                <MenuItem value="false">Disabled</MenuItem>
              </Select>
            </FormControl>
            <Button
              color="primary"
              variant="contained"
              className={styles.submitButton}
              onClick={() => onUpdate(policyOptions)}>
              Done
            </Button>
          </FormGroup>
        </div>
      </SwipeableDrawer>
    </>
  )
}
