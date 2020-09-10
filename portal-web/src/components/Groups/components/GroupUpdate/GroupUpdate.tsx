import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { pathOr } from "ramda"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { PortalDialogTitle, Loading } from "../../../shared"
import { VIEW_GROUP } from "../GroupsQueries"
import styles from "../Groups.module.scss"

import GeneralSettingsUpdate from "./GeneralSettingsUpdate"
import MembershipSettingsUpdate from "./MembershipSettingsUpdate"

type OwnProps = {
  closeDialog: () => void
  id: string
  isSystemGroup: boolean
}

export const GroupUpdate = ({ closeDialog, id, isSystemGroup }: OwnProps) => {
  const { loading, data: groupData, refetch } = useQuery(VIEW_GROUP, {
    variables: { id },
  })

  const [form, setForm] = React.useState("membershipSettingsUpdate")

  const handleChange = event => setForm(event.target.value)

  return (
    <Paper>
      <Dialog
        open
        onClose={closeDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl">
        <PortalDialogTitle
          title="View/Update Group"
          closeDialog={closeDialog}
        />
        <DialogContent>
          <div className={styles.groupUpdateContainer}>
            {loading && <Loading />}

            {!loading && (
              <div>
                <FormControl>
                  <Select
                    labelId="Group-text"
                    id="Group-edit-Type"
                    value={form}
                    className={styles.settingsDropdown}
                    onChange={handleChange}>
                    <MenuItem value="generalSettingsUpdate">
                      General Settings
                    </MenuItem>
                    <MenuItem value="membershipSettingsUpdate">
                      Membership Settings
                    </MenuItem>
                  </Select>
                </FormControl>
                {
                  {
                    generalSettingsUpdate: (
                      <GeneralSettingsUpdate
                        id={id}
                        groupData={groupData}
                        refetch={refetch}
                      />
                    ),
                    membershipSettingsUpdate: (
                      <MembershipSettingsUpdate
                        id={id}
                        isSystemGroup={isSystemGroup}
                        currentMembers={pathOr(
                          [],
                          ["group", "members", "users"],
                          groupData,
                        )}
                      />
                    ),
                  }[form]
                }
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </Paper>
  )
}
