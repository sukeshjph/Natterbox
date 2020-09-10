import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import Spinner from "react-spinkit"
import { Locale, GeneralSettings } from "./components"
import { GET_ACCOUNT_SETTINGS } from "./AllSettingsQueries"
import { Loading, ErrorSnack } from "../../../../../shared"

export const AllSettings = () => {
  const [errorSnack, setErrorSnack] = useState(false)
  const { loading, error, data: gSettingsdata, refetch } = useQuery(
    GET_ACCOUNT_SETTINGS,
  )

  return (
    <>
      {loading && <Loading spinner={<Spinner name="line-scale" />} />}
      {error && (
        <ErrorSnack
          error={error!.message}
          open={error! && !errorSnack}
          handleClose={() => setErrorSnack(true)}
        />
      )}
      {!loading && !error && (
        <>
          <GeneralSettings generalSettings={gSettingsdata.generalSettings} />
          <Locale
            gSettings={gSettingsdata.localeSettings}
            numbers={gSettingsdata.numbers}
            refetchSettings={refetch}
          />
        </>
      )}
    </>
  )
}
