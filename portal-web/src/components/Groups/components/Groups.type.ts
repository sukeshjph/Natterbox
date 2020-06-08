export interface IGroup {
  id: null | String
  sipExtension: null | String
  name: null | String
  system: null | Boolean
  category: null | String
  emailAddress: null | String
  pin?: null | String
  members: Object
}

export interface IGroupPagination {
  hasMore: boolean
  firstIndex: number
  lastIndex: number
  prevIndex: number
  nextIndex: number
  count: number
  groups: IGroup[]
}
