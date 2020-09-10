import React from "react"
import IconButton from "@material-ui/core/IconButton"
import {
  BeginningIcon,
  PlaybackwardIcon,
  PlaybackForwardIcon,
  EndIcon,
} from "../Images"
import styles from "./PortalPager.module.scss"

interface IPager {
  children?: React.ReactElement
  totalPagesCount?: number
  currentPage: number
  handlePrevPage: () => void
  handleNextPage: () => void
  handleFirstPage: () => void
  handleLastPage: () => void
  hasMore: boolean
  pageLoading: boolean
  isFirstPage: boolean
  isLastPage: boolean
}

export const PortalServerPaging: React.FC<IPager> = React.memo(
  ({
    totalPagesCount = 0,
    currentPage = 0,
    handlePrevPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage,
    hasMore,
    children,
    pageLoading,
    isFirstPage,
    isLastPage,
  }) => {
    return (
      <div className={styles.root}>
        {children}
        <div>
          Page {currentPage + 1} of {totalPagesCount}
        </div>
        <div className={styles.pagerIconContainer}>
          <IconButton
            aria-label="beginning"
            className={styles.pagerIcon}
            onClick={handleFirstPage}
            disabled={pageLoading || isFirstPage}>
            <BeginningIcon />
          </IconButton>
          <IconButton
            aria-label="prev"
            className={styles.pagerIcon}
            onClick={handlePrevPage}
            disabled={pageLoading}>
            <PlaybackwardIcon />
          </IconButton>
          <IconButton
            aria-label="next"
            className={styles.pagerIcon}
            onClick={handleNextPage}
            disabled={!hasMore || pageLoading}>
            <PlaybackForwardIcon />
          </IconButton>
          <IconButton
            aria-label="last"
            className={styles.pagerIcon}
            onClick={handleLastPage}
            disabled={pageLoading || isLastPage}>
            <EndIcon />
          </IconButton>
        </div>
      </div>
    )
  },
)
