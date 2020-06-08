// @ts-ignore
import logger from "@plugins/winston"
// @ts-ignore
import SapienAPI from "@dataSources/sapienAPI"
import userResolvers from "./resolvers"

const userObj = {
  id: 2282,
  userName: "sheriour1@redmatter.com",
  firstName: "Marek",
  lastName: "Dziekan",
}

const args = {}
const context = {
  logger,
  dataSources: {
    sapienAPI: new (class extends SapienAPI {
      constructor() {
        super()
        // @ts-ignore
        this.context = {
          logger,
          authContext: {
            orgID: 1234,
          },
        }
      }
    })(),
  },
}

describe("User testing", () => {
  it("User.userId", () => {
    const output = userResolvers.User.userId(userObj, args, context)
    expect(output).toEqual(2282)
  })

  it("User.userName", () => {
    const output = userResolvers.User.userName(userObj, args, context)
    expect(output).toEqual("sheriour1@redmatter.com")
  })

  it("User.firstName", () => {
    const output = userResolvers.User.firstName(userObj, args, context)
    expect(output).toEqual("Marek")
  })

  it("User.lastName", () => {
    const output = userResolvers.User.lastName(userObj, args, context)
    expect(output).toEqual("Dziekan")
  })
})
