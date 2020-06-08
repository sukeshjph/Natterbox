import React from "react"
import Icon from "@mdi/react"
import { mdiCheckBoxOutline, mdiCheckboxBlankOutline } from "@mdi/js"
import Checkbox from "@material-ui/core/Checkbox"

export const CheckBox = () => (
  <Checkbox
    checkedIcon={<Icon path={mdiCheckBoxOutline} />}
    icon={<Icon path={mdiCheckboxBlankOutline} />}
  />
)
