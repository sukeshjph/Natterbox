export const grpMock = {
  mutationLoading: false,
  createdGroupData: {},
  getAllGroupsCalled: false,
  getAllGroupsLoading: false,
  getGroupsError: "",
  getGroupsData: null,
  state: {
    categoryDropdown: "",
    errorSnack: false,
    groupState: {
      sipExtension: "",
      name: "",
      emailAddress: "",
      category: "",
      members: {},
    },
    submitType: 1,
    categories: [],
  },
  updateField: jest.fn(),
  submitHandler: () => undefined,
  handleSubmit: () => undefined,
  setError: () => undefined,
  handleErrorClose: () => undefined,
  handleSetCategories: () => undefined,
  resetState: () => undefined,
}
