import {
  itemKeysWithImports,
  featureComponentModelsFromFeatureData,
  mergeLayoutPreviousIdsWithItem,
  featureLayoutsWithLinkedInputs,
} from "./PoliciesActionsHelpers"
import { FeatureLayoutType, PolicyFeatureRootItem } from "./Policies.type"
import { DEFAULT_FEATURE_COLOR } from "../../shared/styles/sharedStyles"

const policyStub: PolicyFeatureRootItem = {
  id: "",
  name: "",
  templateId: "0",
  variables: null,
  subItems: [],
}

const layoutStub: FeatureLayoutType = {
  id: "",
  parentId: null,
  allowsInput: false,
  previousIds: [],
  allowsOutput: false,
  nextIds: [],
  color: DEFAULT_FEATURE_COLOR,
  gridCoords: { column: 0, row: 0 },
}

const data = {
  items: [
    {
      ...policyStub,
      id: "start",
      variables: {
        nextId: "middle",
      },
      subItems: [
        {
          ...policyStub,
          id: "startSub",
          variables: {
            nextId: "middle",
          },
        },
      ],
    },
    {
      ...policyStub,
      id: "middle",
      variables: {
        nextId: "end",
      },
    },
    {
      ...policyStub,
      id: "end",
      variables: null,
    },
  ],
}

const expectedResult = {
  start: {
    ...layoutStub,
    id: "start",
  },
  startSub: {
    ...layoutStub,
    id: "startSub",
  },
  middle: {
    ...layoutStub,
    id: "middle",
  },
  end: {
    ...layoutStub,
    id: "end",
  },
}

describe("itemKeysWithImports", () => {
  it("returns an empty dictionary if the data is not an array, or empty", () => {
    expect(itemKeysWithImports(null)).toEqual({})
    expect(itemKeysWithImports([])).toEqual({})
  })
  it("creates a dictionary of stubs for each uid used within the item list", () => {
    expect(itemKeysWithImports(data.items)).toEqual(expectedResult)
  })
})

describe("mergeLayoutNextIdsWithItem", () => {
  it("returns an empty array if layout nextIds is empty and there is no nextId variable", () => {
    expect(mergeLayoutPreviousIdsWithItem({}, { nextIds: [] })).toEqual([])
  })
  it("returns the layout array of nextIds when there is no nextId variable", () => {
    expect(
      mergeLayoutPreviousIdsWithItem({}, { nextIds: ["FIRST ID"] }),
    ).toEqual(["FIRST ID"])
  })
  it("returns the merged array of nextIds and nextId when there is a nextId variable in the item", () => {
    expect(
      mergeLayoutPreviousIdsWithItem(
        { variables: { nextId: "SECOND ID" } },
        { nextIds: ["FIRST ID"] },
      ),
    ).toEqual(["FIRST ID", "SECOND ID"])
  })
})

describe("featureLayoutsWithLinkedInputs", () => {
  const layouts = {
    start: { ...layoutStub, id: "start", nextIds: ["middle"] },
    middle: { ...layoutStub, id: "middle", nextIds: ["end"] },
    end: { ...layoutStub, id: "end" },
  }
  it("should return a dictionary of layout objects where previousIds match the nextIds of preceding layouts", () => {
    expect(featureLayoutsWithLinkedInputs(layouts)).toEqual({
      ...layouts,
      middle: { ...layouts.middle, previousIds: ["start"] },
      end: { ...layouts.end, previousIds: ["middle"] },
    })
  })
})

describe("featureComponentModelsFromFeatureData", () => {
  it("returns an empty dictionary if the data is null, or contains no items property", () => {
    expect(featureComponentModelsFromFeatureData(null)).toEqual({})
    expect(featureComponentModelsFromFeatureData({})).toEqual({})
  })
  const expectedLayoutStub = {
    ...layoutStub,
    allowsInput: true,
    allowsOutput: true,
  }
  const expectedLayouts = {
    start: { ...expectedLayoutStub, id: "start", nextIds: ["middle"] },
    startSub: {
      ...expectedLayoutStub,
      parentId: "start",
      allowsInput: false,
      id: "startSub",
      nextIds: ["middle"],
    },
    middle: {
      ...expectedLayoutStub,
      id: "middle",
      previousIds: ["start", "startSub"],
      nextIds: ["end"],
    },
    end: { ...expectedLayoutStub, id: "end", previousIds: ["middle"] },
  }
  it("creates a dictionary of FeatureLayouts populated from the item list", () => {
    expect(featureComponentModelsFromFeatureData(data)).toEqual(expectedLayouts)
  })
})
