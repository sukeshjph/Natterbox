/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import Spinner from "react-spinkit"
import Paper from "@material-ui/core/Paper"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { Loading } from "components/shared"
import { useViewArchivingHook } from "./useViewArchivingHook"
import { ArchivingPolicies, ArchivingEndpoints } from "./components"

import styles from "./ViewArchiving.module.scss"

export const ViewArchiving = () => {
  const {
    refetch,
    state,
    data,
    loading,
    error,
    handleRemoveError,
    handleDefaultPolicySelectChange,
  } = useViewArchivingHook()

  const { defaultPolicies } = state

  const allPolicies =
    data &&
    data.orgPolicies.map(policy => (
      <MenuItem value={policy.ID}>{policy.Name}</MenuItem>
    ))

  return (
    <Paper>
      {loading && <Loading spinner={<Spinner name="line-scale" />} />}
      {!loading && (
        <div className={styles.container}>
          <h4>Default Policies</h4>
          <div className={styles.contentContainer}>
            <div className={styles.row}>
              <span className={styles.leftColumn}>
                Default Call Recording Policy
              </span>
              <div className={styles.rightColumn}>
                <FormControl
                  className={`${styles.formControl} ${styles.formSelect}`}>
                  <Select
                    labelId="callRecordingPolicy-select"
                    label="Default Call Recording Policy"
                    id="callrecordingPolicy-id"
                    className={styles.formSelectChoice}
                    value={defaultPolicies.callRecordingPolicy}
                    onChange={handleDefaultPolicySelectChange(
                      "callRecordingPolicy",
                    )}>
                    {allPolicies}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className={styles.row}>
              <span className={styles.leftColumn}>
                Default Buffered Recording Policy
              </span>
              <div className={styles.rightColumn}>
                <FormControl
                  className={`${styles.formControl} ${styles.formSelect}`}>
                  <Select
                    labelId="callBufferingPolicy-select"
                    label="Default Buffered Recording Policy"
                    id="callrecordingPolicy-id"
                    className={styles.formSelectChoice}
                    value={defaultPolicies.bufferedRecordingPolicy}
                    onChange={handleDefaultPolicySelectChange(
                      "bufferedRecordingPolicy",
                    )}>
                    {allPolicies}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className={styles.row}>
              <span className={styles.leftColumn}>Default SMS Policy</span>
              <div className={styles.rightColumn}>
                <FormControl
                  className={`${styles.formControl} ${styles.formSelect}`}>
                  <Select
                    labelId="smsPolicy-select"
                    label="Default SMS Policy"
                    id="callrecordingPolicy-id"
                    className={styles.formSelectChoice}
                    value={defaultPolicies.smsPolicy}
                    onChange={handleDefaultPolicySelectChange("smsPolicy")}>
                    {allPolicies}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className={styles.row}>
              <span className={styles.leftColumn}>Default CDR Policy</span>
              <div className={styles.rightColumn}>
                <FormControl
                  className={`${styles.formControl} ${styles.formSelect}`}>
                  <Select
                    labelId="CDRPolicy-select"
                    label="Default Buffered Recording Policy"
                    id="callrecordingPolicy-id"
                    className={styles.formSelectChoice}
                    value={defaultPolicies.cdrPolicy}
                    onChange={handleDefaultPolicySelectChange("cdrPolicy")}>
                    {allPolicies}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className={`${styles.row} ${styles.allPolicies}`}>
              <ArchivingPolicies />
            </div>

            <div className={`${styles.row} ${styles.allEndpoints}`}>
              <ArchivingEndpoints allEndpoints={data.endpoints} />
            </div>
          </div>

          {/* <div>
            <FormControl
              className={`${styles.formControl} ${styles.formSelect}`}>
              <InputLabel id="pcapPolicy-select" shrink>
                Default PCAP Policy
              </InputLabel>
              <Select
                labelId="pcapPolicy-select"
                label="Default Buffered Recording Policy"
                id="callrecordingPolicy-id"
                className={styles.formSelectChoice}
                value="">
                {data.orgPolicies.map(policy => (
                  <MenuItem value={policy.ID}>{policy.Name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div> */}
        </div>
      )}
    </Paper>
  )
}
