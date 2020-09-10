import React, { useReducer, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { ValidatorForm } from "react-material-ui-form-validator"
import {
  Button,
  Chip,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import FormControl from "@material-ui/core/FormControl"
import { filter } from "ramda"

// our libs
import ChipInput from "material-ui-chip-input"
import styles from "./Voicemail.module.scss"
import {
  GET_VOICEMAIL,
  GET_ALL_USERS,
  UPDATE_VOICEMAIL,
} from "../../../../UserQueries"
import { Loading } from "../../../../../shared"
import { voicemailReducer, voicemailState } from "./VoicemailReducer"
import {
  setVoicemail,
  submitHandler,
  updateField,
  setUsers,
  setUsersCache,
  addEmailTo,
  deleteEmailTo,
} from "./VoicemailActions"
import { VoicemailMiddleware } from "./VoicemailMiddleware"

type OwnProps = {
  userId: number
}

export const Voicemail: React.FC<OwnProps> = ({ userId }: OwnProps) => {
  const { loading: voicemailLoading, data: voicemailData } = useQuery(
    GET_VOICEMAIL,
    {
      variables: { id: userId },
      onCompleted(data) {
        dispatch(
          setVoicemail({
            emailNotification: data.voicemail.emailNotification || false,
            emailTo: data.voicemail.emailTo ? data.voicemail.emailTo : [],
            emailAttachFile: data.voicemail.emailAttachFile || false,
            emailKeepFile: data.voicemail.emailKeepFile || false,
            ccMailboxes: {
              users: data.voicemail.ccMailboxes.users
                ? data.voicemail.ccMailboxes.users
                : [],
            },
          }),
        )
      },
    },
  )

  const [updateVoicemail, { loading: updateLoading }] = useMutation(
    UPDATE_VOICEMAIL,
    {
      onCompleted(data) {
        dispatch(
          setVoicemail({
            ...data.voicemail.updateVoicemail,
          }),
        )
      },
    },
  )

  const { loading: userLoading, data: usersData } = useQuery(GET_ALL_USERS, {
    onCompleted(data) {
      dispatch(setUsers(data.users))
    },
  })

  useEffect(() => {
    if (voicemailData && usersData) {
      // here I need to get the matching row from users based on userID
      const usersCacheData = filter(
        (user: IUser) =>
          voicemailData.voicemail.ccMailboxes.users.indexOf(+user.userId) > -1,
        usersData.users,
      )
      dispatch(setUsersCache(usersCacheData))
    }
  }, [usersData, voicemailData])

  const [state, dispatch] = useReducer(voicemailReducer, {
    ...voicemailState,
    updateVoicemail,
    userId,
  })

  const enhancedDispatch = VoicemailMiddleware(dispatch)

  const { users, usersCache, voicemail } = state
  const {
    emailNotification,
    emailTo,
    emailAttachFile,
    emailKeepFile,
  } = voicemail

  if (voicemailLoading || userLoading || updateLoading) return <Loading />
  return (
    <ValidatorForm
      onSubmit={() => enhancedDispatch(submitHandler(), state)}
      autoComplete="off"
      className={styles.formValidator}>
      <h4>
        Your Voice Mail PIN Number is the same PIN you have configured on the
        General Settings page
      </h4>
      <FormGroup>
        {/* Email Notification */}
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                checked={emailNotification}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.persist()
                  enhancedDispatch(updateField(e), state)
                }}
                name="emailNotification"
                color="primary"
              />
            }
            label="Send email notification when new LocaleSettings delivered"
          />
        </FormControl>
        {/* Email To */}
        <FormControl margin="normal">
          <ChipInput
            disabled={!emailNotification}
            value={emailTo}
            onAdd={chip => enhancedDispatch(addEmailTo(chip), state)}
            onDelete={(chip, index) =>
              enhancedDispatch(
                deleteEmailTo({
                  chip,
                  index,
                }),
                state,
              )
            }
          />
        </FormControl>
        {/* Email Attach File */}
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                checked={emailAttachFile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.persist()
                  enhancedDispatch(updateField(e), state)
                }}
                name="emailAttachFile"
                color="primary"
                disabled={!emailNotification}
              />
            }
            label="Attach LocaleSettings recording to email"
          />
        </FormControl>
        {/* Email Keep File  */}
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                disabled={!emailNotification}
                checked={emailKeepFile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.persist()
                  enhancedDispatch(updateField(e), state)
                }}
                name="emailKeepFile"
                color="primary"
              />
            }
            label="Keep a copy of the LocaleSettings in LocaleSettings box after emailing"
          />
        </FormControl>
        <h4>
          You can access your voice mail by dialling *100 from your extension,
          or by dialling *101 from any other extension.
        </h4>

        {usersData && voicemailData ? (
          <Autocomplete
            multiple
            id="tags-standard"
            options={users}
            renderTags={(value: IUser[], getTagProps) => {
              return value.map((option: IUser, index: number) => (
                <Chip
                  variant="outlined"
                  label={`${option.firstName} ${option.lastName}`}
                  {...getTagProps({ index })}
                />
              ))
            }}
            getOptionLabel={option => {
              if (option && option.firstName && option.lastName)
                return `${option.firstName} ${option.lastName}`
              return ""
            }}
            getOptionSelected={(option, value) => {
              return option.userId === value.userId
            }}
            value={usersCache}
            onChange={(e, val) => {
              dispatch(setUsersCache(val))
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Copy Voicemails to other LocaleSettings boxes"
              />
            )}
          />
        ) : (
          <Loading />
        )}

        <FormControl margin="normal">
          <Button
            variant="contained"
            size="medium"
            type="submit"
            color="primary"
            className={styles.Button}>
            Save
          </Button>
        </FormControl>
      </FormGroup>
    </ValidatorForm>
  )
}
