import React from "react"
import Spinner from "react-spinkit"
import Paper from "@material-ui/core/Paper"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import {
  PortalTable,
  Loading,
  ErrorSnack,
  ActionBlocks,
  ActionTypes,
  PortalServerPaging,
  Preferences,
} from "components/shared"
import { ISoundWithPagers, ISound } from "./Sound.type"
import { useSoundListHook } from "./useSoundListHook"
import { CreateSound, EditSound } from "./components"

import styles from "./Sound.module.scss"

const pagerOptions = [100, 150, 250, 400]

export const SoundList = () => {
  const {
    handlePrefChange,
    handlePageNavigation,
    handlePageSizeChange,
    getAllSoundCalled,
    soundListLoading,
    soundlistError,
    soundlistData,
    refetch,
    state,
    handleRemoveError,
    handleAddSoundChange,
    handleEditSoundChange,
    handleSetCurrentSound,
  } = useSoundListHook()

  const {
    columnsToShow,
    showError,
    pageLength,
    currentPageIndex,
    showAddSound,
    showEditSound,
    currentSound,
  } = state

  const {
    count,
    hasMore,
    firstIndex,
    lastIndex,
    prevIndex,
    nextIndex,
    sound: rows,
  }: ISoundWithPagers =
    soundlistData && soundlistData.soundPaginated
      ? soundlistData.soundPaginated
      : {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 0,
          numbers: [],
        }

  const getSortedRows = () => {
    if (rows && rows.length > 0) {
      return rows.sort((a, b) => a.tag.localeCompare(b.tag))
    }

    return rows
  }

  const handleTableRowClick = ({ id, tag, description }) => {
    handleEditSoundChange(true)
    handleSetCurrentSound({ id, tag, description })
  }

  const actions = {
    [ActionTypes.CLEARFILTER]: {
      visible: false,
    },
    [ActionTypes.ADDNEW]: {
      event: () => handleAddSoundChange(true),
      label: "Add Sound",
    },
    [ActionTypes.HIDEFILTER]: {
      visible: false,
    },
    [ActionTypes.EXPORT]: {
      visible: false,
    },
    [ActionTypes.REMOVE]: {
      visible: false,
    },
  }

  return (
    <Paper>
      {getAllSoundCalled && soundListLoading && (
        <Loading spinner={<Spinner name="line-scale" />} />
      )}
      {soundlistError && (
        <ErrorSnack
          error={soundlistError!.message}
          open={soundlistError! && !showError}
          handleClose={handleRemoveError}
        />
      )}
      {showAddSound && (
        <CreateSound
          closeDialog={() => handleAddSoundChange(false)}
          refetch={() => refetch()}
        />
      )}
      {showEditSound && (
        <EditSound
          closeDialog={() => handleEditSoundChange(false)}
          currentSound={currentSound}
          refetch={refetch}
        />
      )}
      {!soundListLoading && !soundlistError && (
        <div className={styles.soundContainer} data-testId="soundListContainer">
          <div className={styles.contentHeader}>
            <p>
              You can create a new recording by clicking the &quot;add
              sound&quot; button or dialling *150 from your extension. <br />
              You may also modify an existing recording via your extension by
              referencing the sound item numerical ID.
            </p>
            <button
              type="button"
              data-testid="refreshBtn"
              onClick={() => refetch()}
              className={styles.soundRefresh}>
              Refresh Now
            </button>
            to see any new sounds you have recently recorded
          </div>
          <ActionBlocks
            actions={actions}
            preferences={
              <Preferences
                columns={columnsToShow}
                handlePrefChange={handlePrefChange}
                showFilter={() => undefined}
              />
            }>
            <PortalServerPaging
              totalPagesCount={count}
              currentPage={currentPageIndex}
              hasMore={hasMore}
              handlePrevPage={handlePageNavigation(prevIndex)}
              handleNextPage={handlePageNavigation(nextIndex)}
              handleFirstPage={handlePageNavigation(firstIndex)}
              handleLastPage={handlePageNavigation(lastIndex)}
              pageLoading={soundListLoading}
              isFirstPage={currentPageIndex === 0}
              isLastPage={currentPageIndex === lastIndex}>
              <FormControl>
                <Select
                  labelId="page-select"
                  id="page-select-id"
                  value={pageLength}
                  className={styles.pageSizeDropdown}
                  onChange={handlePageSizeChange}>
                  {pagerOptions.map(page => (
                    <MenuItem value={page}>{page}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </PortalServerPaging>
          </ActionBlocks>

          <PortalTable<ISound>
            objects={getSortedRows()}
            showCheckBoxColumn={false}
            handleRowClick={handleTableRowClick}
            properties={columnsToShow.filter(column => column.show)}
          />
        </div>
      )}
    </Paper>
  )
}
