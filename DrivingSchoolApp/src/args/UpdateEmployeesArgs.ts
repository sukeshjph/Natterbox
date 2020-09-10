import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { EmployeesUpdateInput } from "../inputs/EmployeesUpdateInput";
import { EmployeesWhereUniqueInput } from "../inputs/EmployeesWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateEmployeesArgs {
  @TypeGraphQL.Field((_type) => EmployeesUpdateInput, { nullable: false })
  data!: EmployeesUpdateInput;

  @TypeGraphQL.Field((_type) => EmployeesWhereUniqueInput, { nullable: false })
  where!: EmployeesWhereUniqueInput;
}
