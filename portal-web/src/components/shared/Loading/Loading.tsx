import React from "react"
import Spinner from "react-spinkit"
import styles from "./Loading.module.scss"

type LoadingProps = {
  spinner?: React.ReactElement
}

export const Loading: React.FC<LoadingProps> = ({ spinner }) => (
  <div className={styles.spinPanel} data-testid="loadingSpinner">
    {spinner || <Spinner name="ball-spin-fade-loader" />}
  </div>
)
