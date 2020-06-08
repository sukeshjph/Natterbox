import React, { useState, useEffect } from "react"
import { pathOr, isNil } from "ramda"
import { useMutation, useQuery } from "@apollo/react-hooks"
import FormControl from "@material-ui/core/FormControl"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { Loading } from "../../../shared/Loading/Loading"
import { VIEW_GROUP, UPDATE_GROUP } from "../GroupsQueries"
import { IGroup } from "../Groups.type"
import styles from "../Groups.module.scss"
import { LightTooltip } from "../../../shared/LightTooltip/LightTooltip"

type GroupState = Pick<IGroup, "sipExtension" | "name" | "emailAddress" | "pin">

const GroupInitialState = {
  sipExtension: null,
  name: "",
  emailAddress: null,
}

type ownProps = {
  id: string
}

const GeneralSettingsUpdate: React.FC<ownProps> = ({ id }) => {
  const { loading, data, refetch } = useQuery(VIEW_GROUP, {
    variables: { id },
  })
  const [GroupState, setGroupState] = useState<GroupState>(GroupInitialState)
  const [PinState, setPinState] = useState(null)

  const [
    updateGroup,
    { loading: mutationLoading, data: updatedGroupData },
  ] = useMutation(UPDATE_GROUP, {
    onCompleted() {
      refetch()
    },
  })

  useEffect(() => {
    setGroupState({
      sipExtension: pathOr("", ["group", "sipExtension"], data),
      name: pathOr(null, ["group", "name"], data),
      emailAddress: pathOr(null, ["group", "emailAddress"], data),
    })
  }, [data])

  if (loading) return <Loading />

  const updatePin = e => {
    setPinState(e.target.value === "" ? null : e.target.value)
  }

  // Update the Field
  const updateField = e => {
    if (e.target.type === "checkbox")
      setGroupState({
        ...GroupState,
        [e.target.name]: e.target.checked,
      })

    if (e.target.type === "text")
      setGroupState({
        ...GroupState,
        [e.target.name]: e.target.value === "" ? null : e.target.value,
      })
  }

  // Send Mutation to API
  const submitHandler = () => {
    const group = {
      ...GroupState,
    }

    // if there is a pin thats not null then I can add it in
    if (!isNil(PinState)) group.pin = PinState

    updateGroup({
      variables: {
        id,
        group,
      },
    }).catch(() => {})
  }

  const { sipExtension, name, emailAddress } = GroupState

  const formDisabled = !isNil(updatedGroupData) || mutationLoading

  return (
    <ValidatorForm
      onSubmit={submitHandler}
      autoComplete="off"
      className={styles.formValidator}>
      {/*  Name = name */}
      <FormControl margin="normal">
        <TextValidator
          InputLabelProps={{ shrink: true }}
          class="standard-basic"
          name="name"
          label="Name"
          onChange={updateField}
          value={name}
          disabled={formDisabled}
          InputProps={{
            className: styles.textControl,
          }}
        />
      </FormControl>
      <FormGroup>
        <FormControl>
          <p>
            The group pickup code for this group is *
            <strong>6{sipExtension}</strong>
          </p>
        </FormControl>
        {/*  Email Address = emailAddress */}
        <FormControl margin="normal">
          <TextValidator
            InputLabelProps={{ shrink: true }}
            class="standard-basic"
            name="emailAddress"
            label="Email Address"
            onChange={updateField}
            value={emailAddress}
            disabled={formDisabled}
            InputProps={{
              className: styles.textControl,
            }}
          />
        </FormControl>
        {/*  Extension = sipExtension */}
        <LightTooltip title="Must be within the range of 2000-7999 ">
          <FormControl margin="normal">
            <TextValidator
              InputLabelProps={{ shrink: true }}
              class="standard-basic"
              name="sipExtension"
              label="Default Extension"
              onChange={updateField}
              value={sipExtension}
              disabled={formDisabled}
              InputProps={{
                className: styles.textControl,
              }}
              validators={["minNumber:2000", "maxNumber:7999", "isNumber"]}
              errorMessages={[
                "Number must be above 12000.",
                "Number must be below 17999.",
                "Must contain only numerical characters.",
              ]}
            />
          </FormControl>
        </LightTooltip>
        {/*  Voicemail Pin = pin */}
        <FormControl margin="normal">
          <TextValidator
            InputLabelProps={{ shrink: true }}
            class="standard-basic"
            name="pin"
            label="Voicemail Pin"
            onChange={updatePin}
            value={PinState}
            disabled={formDisabled}
            InputProps={{
              className: styles.textControl,
            }}
          />
        </FormControl>
        {isNil(updatedGroupData) && (
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={formDisabled}
            className={styles.GroupButton}>
            {mutationLoading ? "Updating" : "Update"}
          </Button>
        )}
        {!isNil(updatedGroupData) && "Updated the Group successfully"}
      </FormGroup>
    </ValidatorForm>
  )
}

export default GeneralSettingsUpdate
