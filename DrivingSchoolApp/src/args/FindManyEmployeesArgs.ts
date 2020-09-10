import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { EmployeesOrderByInput } from "../inputs/EmployeesOrderByInput";
import { EmployeesWhereInput } from "../inputs/EmployeesWhereInput";
import { EmployeesWhereUniqueInput } from "../inputs/EmployeesWhereUniqueInput";
import { EmployeesDistinctFieldEnum } from "../enums/EmployeesDistinctFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyEmployeesArgs {
  @TypeGraphQL.Field((_type) => EmployeesWhereInput, { nullable: true })
  where?: EmployeesWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [EmployeesOrderByInput], { nullable: true })
  orderBy?: EmployeesOrderByInput[] | undefined;

  @TypeGraphQL.Field((_type) => EmployeesWhereUniqueInput, { nullable: true })
  cursor?: EmployeesWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, { nullable: true })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [EmployeesDistinctFieldEnum], {
    nullable: true,
  })
  distinct?: Array<keyof typeof EmployeesDistinctFieldEnum> | undefined;
}
