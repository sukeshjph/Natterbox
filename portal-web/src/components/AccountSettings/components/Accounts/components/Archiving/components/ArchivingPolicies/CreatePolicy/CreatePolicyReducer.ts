import { createReducer } from "@reduxjs/toolkit"
import * as CreatePActions from "./CreatePolicyActions"
import { ICreatePolicyReducer } from "../../../Archiving.type"

export const policyCreateInitialState: ICreatePolicyReducer = {
  error: "",
  createPolicy: {
    Name: {
      Updatable: "yes",
      Value: "",
    },
    Mode: {
      Updatable: "yes",
      Value: "",
    },
    Version: {
      Updatable: "no",
      Value: 0,
    },
    OrgID: {
      Updatable: "no",
      Value: 0,
    },
    RetentionMax: {
      Updatable: "yes",
      Unit: "",
      Value: 0,
    },
    RetentionMin: {
      Updatable: "yes",
      Unit: "",
      Value: 0,
    },
    ReducedRedundancy: {
      Updatable: "yes",
      Value: "no",
    },
    OwnerUser: {
      CanRead: "no",
      CanDelete: "no",
      Updatable: "yes",
    },
    AskReasonForAccess: {
      Updatable: "yes",
      Value: "",
    },
    Description: {
      Updatable: "yes",
      Value: "",
    },
    ACLType: {
      Updatable: "yes",
      Value: "",
    },
    AutoApproveDataSubjectRequest: {
      Updatable: "yes",
      Value: "",
    },
    AllowUnrestrictedAccess: {
      Updatable: "yes",
      Value: "",
    },
    DisallowRecordingDownload: {
      Updatable: "yes",
      Value: "",
    },
    Users: {
      Updatable: "yes",
    },
    Groups: {
      Updatable: "yes",
      Value: "",
    },
    DataCustodians: {
      Updatable: "yes",
      Notify: "",
      Value: "",
    },
    StorageEndpointID: {
      Updatable: "yes",
      Value: 0,
    },
    OtherVersions: {
      Updatable: "no",
      Value: {
        childKey: "OtherVersion",
        Value: [],
      },
    },
  },
}

export const policyCreateReducer = createReducer(
  policyCreateInitialState,
  builder =>
    builder.addCase(CreatePActions.setCreatePolicy, (state, action) => ({
      ...state,
      createPolicy: {
        ...state.createPolicy,
        ...action.payload,
      },
    })),
)
