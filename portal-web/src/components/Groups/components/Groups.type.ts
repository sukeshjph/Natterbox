interface Members {
  users: number[]
}

export interface IGroup {
  id: null | String
  sipExtension: null | String
  name: null | String
  system: null | Boolean
  category: null | String
  emailAddress: null | String
  pin?: null | String
  members?: Members | {}
}

export interface IGroupPagination extends IPager {
  groups: IGroup[]
}

export type GroupCreateState = Pick<
  IGroup,
  "sipExtension" | "name" | "emailAddress" | "pin" | "category" | "members"
>

export interface groupCreateInitialState {
  categoryDropdown: string
  errorSnack: boolean
  groupState: GroupCreateState
  submitType: 1 | 2
  categories: string[]
}
