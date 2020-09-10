import { useLazyQuery } from "@apollo/react-hooks"
import React, { useEffect, useReducer } from "react"
import { Paper } from "@material-ui/core"
import Spinner from "react-spinkit"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import InputBase from "@material-ui/core/InputBase/InputBase"
import Icon from "@mdi/react"
import { mdiMagnify } from "@mdi/js"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
import { GET_ALL_POLICIES } from "../PoliciesQueries"
import {
  IPoliciesWithPagers,
  IPolicy,
  ISearchParams,
  PolicyTypeOption,
} from "../Policies.type"
import {
  ErrorSnack,
  Loading,
  PortalServerPaging,
  PortalTable,
} from "../../../shared"
import styles from "../Policies.module.scss"
import headerStyles from "../../../shared/Header/Header.module.scss"
import {
  setCurrentPageIndex,
  setCurrentTabIndex,
  setErrorSnack,
  setPoliciesTypeToShow,
  setSearchInput,
  setSearchTerm,
} from "../PoliciesActions"
import {
  initialPoliciesListState,
  policiesListReducer,
} from "../PoliciesReducer"

const pageLength = 100

export const PoliciesList = withRouter(({ history, match }) => {
  const [state, dispatch] = useReducer(
    policiesListReducer,
    initialPoliciesListState,
  )

  const {
    errorSnack,
    currentPageIndex,
    currentTabIndex,
    policiesTypeToShow,
    searchInput,
    searchTerm,
    policyColProps: columnsToShow,
  } = state

  const [loadPolicies, { called, loading, error, data }] = useLazyQuery(
    GET_ALL_POLICIES,
    {
      variables: {
        index: currentPageIndex,
        length: pageLength,
        searchInput,
        type: policiesTypeToShow,
      },
    },
  )

  const handlePageNavigation = (pageIndex: number) => () => {
    dispatch(setCurrentPageIndex(pageIndex))
    loadPolicies()
  }

  const policiesWithPagers: IPoliciesWithPagers =
    data && data.policiesPaginated
      ? data.policiesPaginated
      : {
          hasMore: false,
          firstIndex: 0,
          lastIndex: 0,
          prevIndex: 0,
          nextIndex: 0,
          count: 0,
          policies: [],
        }

  const {
    count,
    hasMore,
    firstIndex,
    lastIndex,
    prevIndex,
    nextIndex,
    policies: rows,
  } = policiesWithPagers

  useEffect(() => {
    loadPolicies()
  }, [])

  const filterByType = type => {
    if (type === null) return rows
    return rows.filter(row => row.type === type)
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    dispatch(setCurrentTabIndex(newValue))
    dispatch(
      setPoliciesTypeToShow(
        (event.currentTarget as HTMLElement).getAttribute(
          "data-policies-type",
        ) as string,
      ),
    )
  }

  const handleSearchTyped = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      dispatch(setSearchTerm(null))
      dispatch(setSearchInput(null))
    } else {
      dispatch(setSearchTerm(e.target.value))
    }
  }

  const handleNewPolicyClicked = () => {
    history.push(`${match.url}/new`)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13) {
      if (searchTerm !== null) {
        const searchParams: ISearchParams = { name: searchTerm! }
        dispatch(setSearchInput(searchParams))
      } else {
        dispatch(setSearchInput(null))
      }
    }
  }

  return (
    <Paper data-testid="Policies">
      {called && loading && <Loading spinner={<Spinner name="line-scale" />} />}
      {error && (
        <ErrorSnack
          error={error!.message}
          open={error! && !errorSnack}
          handleClose={() => dispatch(setErrorSnack(true))}
          data-testid="PoliciesError"
        />
      )}

      {!loading && !error && (
        <>
          <div className={styles.tableHeader}>
            <div className={styles.tabs}>
              <Tabs
                value={currentTabIndex}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary">
                <Tab label="All Policies" data-policies-type={null} />
                <Tab
                  label="Call Policies"
                  data-policies-type={PolicyTypeOption.CALL}
                />
                <Tab
                  label="Non-call Policies"
                  data-policies-type={PolicyTypeOption.NON_CALL}
                />
                <Tab
                  label="System Policies"
                  data-policies-type={PolicyTypeOption.SYSTEM}
                />
              </Tabs>
            </div>
            <PortalServerPaging
              totalPagesCount={count}
              currentPage={currentPageIndex}
              hasMore={hasMore}
              handlePrevPage={handlePageNavigation(prevIndex)}
              handleNextPage={handlePageNavigation(nextIndex)}
              handleFirstPage={handlePageNavigation(firstIndex)}
              handleLastPage={handlePageNavigation(lastIndex)}
              pageLoading={loading}
              isFirstPage={currentPageIndex === 0}
              isLastPage={currentPageIndex === lastIndex}
            />
            <Paper className={headerStyles.headerSearch}>
              <InputBase
                value={searchTerm}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchTyped}
                onKeyDown={handleKeyPress}
              />
              <div>
                <Icon path={mdiMagnify} size={1} />
              </div>
            </Paper>
            <Button
              color="primary"
              variant="contained"
              className={styles.headerButton}
              onClick={handleNewPolicyClicked}>
              Create New Policy
            </Button>
          </div>
          <PortalTable<IPolicy>
            objects={filterByType(policiesTypeToShow)}
            showCheckBoxColumn={false}
            filterRowVisible={false}
            properties={columnsToShow.filter(column => column.show)}
          />
        </>
      )}
    </Paper>
  )
})
