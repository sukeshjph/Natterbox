import React from "react"
import Paper from "@material-ui/core/Paper"
import Spinner from "react-spinkit"
import { Loading, ErrorSnack } from ".."

type ownProps = {
  baseClass?: string
  showLoading: boolean
  showError: any
  error: any
  handleErrorClose?: () => void
  render(): void
}

export const CompRender: React.FC<ownProps> = ({
  baseClass,
  showLoading,
  showError,
  error,
  handleErrorClose,
  render,
}) => (
  <Paper className={baseClass || ""}>
    {showLoading && <Loading spinner={<Spinner name="line-scale" />} />}
    {showError && (
      <ErrorSnack
        error={error!.message}
        open={showError}
        handleClose={handleErrorClose}
      />
    )}
    {render()}
  </Paper>
)
