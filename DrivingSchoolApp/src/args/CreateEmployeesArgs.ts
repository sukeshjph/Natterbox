import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { EmployeesCreateInput } from "../inputs/EmployeesCreateInput";

@TypeGraphQL.ArgsType()
export class CreateEmployeesArgs {
  @TypeGraphQL.Field((_type) => EmployeesCreateInput, { nullable: false })
  data!: EmployeesCreateInput;
}
