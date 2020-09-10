/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import { keys, omit, values, sortBy, prop, isEmpty, isNil } from "ramda"
import Icon from "@mdi/react"
import { mdiCloseCircle } from "@mdi/js"
import Select from "@material-ui/core/Select"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { ILocale } from "../../../../Accounts.type"
import styles from "../../../../Accounts.module.scss"
import {
  CountryCodes,
  Voices,
  timeZones,
} from "../../../../../../../shared/Countries"
import { ErrorAlert } from "../../../../../../../shared"
import { INumber } from "../../../../../../../Numbers/components/Number.type"
import {
  DELETE_LOCALE_SETTINGS,
  UPDATE_LOCALE_SETTINGS,
} from "../../AllSettingsQueries"
import { LocaleCommonRow } from "./LocaleRow"

type OwnProps = {
  gSettings: ILocale
  numbers: Pick<INumber, "number" | "policyId">[]
  refetchSettings(): void
}

const getFieldValues = (key: string) => {
  switch (key) {
    case "countryCode":
      return CountryCodes.map(cn => (
        <MenuItem value={cn.Code}>{cn.Country}</MenuItem>
      ))
    case "timezone":
      return timeZones
        .sort((a, b) => (a.Val > b.Val ? 1 : -1))
        .map(zone => <MenuItem value={zone.Val}>{zone.Label}</MenuItem>)
    case "voice":
      return sortBy(prop("Portal Name"), Voices).map(vc => (
        <MenuItem value={vc["Sapien Name"]}>{vc["Portal Name"]}</MenuItem>
      ))

    default:
      return <div>No Value</div>
  }
}

const labels = {
  countryCode: "Home Country",
  timezone: "Time Zone",
  voice: "Voice",
}

export const Locale: React.FC<OwnProps> = ({
  gSettings,
  numbers,
  refetchSettings,
}: OwnProps) => {
  const [gSettingsState, setGSettingsState] = useState<ILocale>({
    countryCode: gSettings.countryCode,
    timezone: gSettings.timezone,
    voice: gSettings.voice,
    externalCallerIdNumber: gSettings.externalCallerIdNumber,
    presentCallerId: gSettings.presentCallerId,
  })

  const [statusObj, setStatusObj] = useState<{
    message: string
    severity: "error" | "info" | "success" | "warning"
    show: boolean
  }>({
    message: "",
    severity: "success",
    show: false,
  })

  const handleOnComplete = (message: string) => {
    refetchSettings()
    setStatusObj({
      ...statusObj,
      message,
      severity: "success",
      show: true,
    })
  }

  const [updateSettings, { loading: updateLoading }] = useMutation(
    UPDATE_LOCALE_SETTINGS,
    {
      onCompleted(data) {
        const { message } = data.updateLocale
        handleOnComplete(message)
      },
    },
  )

  const [deleteSettings, { loading: deleteLoading }] = useMutation(
    DELETE_LOCALE_SETTINGS,
    {
      onCompleted(data) {
        const { message } = data.deleteLocale
        handleOnComplete(message)
      },
    },
  )

  const resetForm = () => {
    setGSettingsState({
      countryCode: gSettings.countryCode,
      timezone: gSettings.timezone,
      voice: gSettings.voice,
      externalCallerIdNumber: gSettings.externalCallerIdNumber,
      presentCallerId: gSettings.presentCallerId,
    })
  }

  useEffect(() => {
    resetForm()
  }, [gSettings])

  const updateField = (fieldType: string) => e => {
    if (e.target.type === "checkbox") {
      setGSettingsState({
        ...gSettingsState,
        [fieldType]: e.target.checked,
      })
    } else {
      setGSettingsState({
        ...gSettingsState,
        [fieldType]: e.target.value,
      })
    }
  }

  const handleLoadDefaults = () => {
    deleteSettings({
      variables: {
        deleteInput: {
          settingsCategory: "general",
          settings: [
            "externalCallerIdNumber",
            "presentCallerId",
            "voice",
            "countryCode",
            "timezone",
          ],
        },
      },
    }).catch(() => {})
  }

  const preValidate = () =>
    values(omit(["holdMusic"], gSettingsState)).reduce(
      (acc, curValue) => acc && !isNil(curValue) && !isEmpty(curValue),
      true,
    )

  const handleSave = () => {
    if (!preValidate()) {
      setStatusObj({
        ...statusObj,
        message: "Please fill all the required fields",
        severity: "error",
        show: true,
      })
      return false
    }

    const settings = {
      ...omit(["holdMusic", "externalCallerIdNumber"], gSettingsState),
      ...(gSettingsState.presentCallerId
        ? { externalCallerIdNumber: gSettingsState.externalCallerIdNumber }
        : {}),
    }

    updateSettings({
      variables: {
        settings,
      },
    }).catch(() => {})

    return true
  }

  const { presentCallerId, externalCallerIdNumber } = gSettingsState

  const externalNumbers = (numbers || [])
    .filter(num => num.policyId !== null)
    .map(num => num.number)

  const formDisabled = deleteLoading || updateLoading

  const getActionButton = (text: string, click: (event: any) => void) => (
    <Button
      color="primary"
      variant="contained"
      className={styles.gSettingsButtons}
      onClick={click}
      disabled={formDisabled}>
      {text}
    </Button>
  )

  return (
    <div className={styles.gSettingsRoot}>
      <div className={styles.localePanel}>
        <h3>Locale</h3>
      </div>
      <Table>
        <TableBody>
          {keys(
            omit(
              ["presentCallerId", "externalCallerIdNumber", "holdMusic"],
              gSettingsState,
            ),
          ).map(stateKey => (
            <LocaleCommonRow
              headerText={labels[stateKey]}
              headerStyle={styles.gSettingsLeftCol}
              contentStyle={styles.gSettingsRightCol}
              contentChildren={
                <Select
                  labelId={stateKey}
                  onChange={updateField(stateKey)}
                  id={`${stateKey}-id`}
                  value={gSettingsState[stateKey]}
                  className={styles.gSettingsSelect}
                  disabled={formDisabled}
                  data-testid={`${stateKey}-id`}>
                  {getFieldValues(stateKey)}
                </Select>
              }
            />
          ))}
          <TableRow>
            <TableCell
              component="th"
              colSpan={2}
              className={styles.gSettingsCol}>
              <p>
                The caller identity defines what will be displayed on any phones
                outside
                <br />
                of your organisation
              </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              className={styles.gSettingsCol}
              colSpan={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={presentCallerId || false}
                    onChange={updateField("presentCallerId")}
                    name="presentCallerIdCheck"
                    color="primary"
                    disabled={formDisabled}
                    data-testid="presentCallerIdCheckBox"
                  />
                }
                className={styles.presentCallerId}
                label="Present Caller Id Number"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" className={styles.gSettingsLeftCol}>
              Caller Identity number External
            </TableCell>
            <TableCell className={styles.gSettingsRightCol}>
              <div>
                <Select
                  labelId="ciN-ext"
                  id="ciN-ext-id"
                  value={externalCallerIdNumber}
                  className={styles.gSettingsSelect}
                  onChange={updateField("externalCallerIdNumber")}
                  disabled={formDisabled || !presentCallerId}
                  data-testid="externalCallerIdNumber">
                  {externalNumbers.map(num => (
                    <MenuItem value={num!}>{num}</MenuItem>
                  ))}
                </Select>
                {isEmpty(externalNumbers) && (
                  <>
                    <div className={styles.numberMessage}>
                      <Icon
                        path={mdiCloseCircle}
                        size={0.8}
                        horizontal
                        vertical
                        color="red"
                      />
                      <span>
                        There are no numbers asscoaited with your organisation,
                        <br />
                        click the button below to create numbers
                      </span>
                    </div>
                    <Button
                      color="primary"
                      variant="contained"
                      className={styles.gSettingsButtons}
                      disabled={formDisabled}
                      component={Link}
                      to="/numbers">
                      Add Numbers
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={styles.gSettingsCol}>
              {getActionButton(
                deleteLoading ? "Loading" : "Load Defaults",
                handleLoadDefaults,
              )}

              {getActionButton("Revert Changes", () => {
                setStatusObj({
                  ...statusObj,
                  message: "",
                  severity: "success",
                  show: false,
                })
                resetForm()
              })}
              {getActionButton(updateLoading ? "Saving" : "Save", handleSave)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.gSettingsCol} colSpan={2}>
              {statusObj.show && (
                <ErrorAlert
                  message={statusObj.message}
                  severity={statusObj.severity}
                />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
