import React from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import Icon from "@mdi/react"
import { mdiClose } from "@mdi/js"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import styles from "./PortalDialog.module.scss"

const dialogTitleStyles = makeStyles({
  root: {
    backgroundColor: "#f7f7f7",
    height: "60px",
    padding: "0 12px 10px 20px",
  },
})

type titleProps = {
  title: string
  closeDialog: () => void
}

export const PortalDialogTitle: React.FC<titleProps> = ({
  title,
  closeDialog,
}) => {
  const dialogTitleClasses = dialogTitleStyles()

  return (
    <DialogTitle
      id="alert-dialog-slide-title"
      classes={{
        root: dialogTitleClasses.root,
      }}
      disableTypography>
      <div className={styles.portalDialogTitle}>
        <h4>{title}</h4>
        <IconButton onClick={closeDialog}>
          <Icon path={mdiClose} size={1} horizontal vertical rotate={-90} />
        </IconButton>
      </div>
    </DialogTitle>
  )
}
