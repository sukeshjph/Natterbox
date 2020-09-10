import React from "react"
import Icon from "@mdi/react"
import { mdiCheckBoxOutline, mdiCheckboxBlankOutline } from "@mdi/js"
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox"

export const PortalCheckBox: React.FC<CheckboxProps> = () => (
  <Checkbox
    checkedIcon={<Icon path={mdiCheckBoxOutline} />}
    icon={<Icon path={mdiCheckboxBlankOutline} />}
  />
)
