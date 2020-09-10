import * as TypeGraphQL from "type-graphql";
import { Address, Employees } from "../../models";

@TypeGraphQL.Resolver((of) => Employees)
export class EmployeeRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Address, {
    nullable: true,
    description: undefined,
  })
  async address(
    @TypeGraphQL.Root() employee: Employees,
    @TypeGraphQL.Ctx() ctx: any
  ): Promise<Address | undefined> {
    if (employee.address_id) {
      return ctx.prisma.address.findOne({
        where: { address_id: employee.address_id },
      });
    }

    return null;
  }
}
