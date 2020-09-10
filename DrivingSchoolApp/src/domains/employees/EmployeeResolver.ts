import * as TypeGraphQL from "type-graphql";
import { Employees } from "../../models";
import {
  CreateEmployeesArgs,
  FindManyEmployeesArgs,
  UpdateEmployeesArgs,
} from "../../args";

@TypeGraphQL.Resolver((of) => Employees)
export class EmployeeResolver {
  @TypeGraphQL.Query(() => [Employees])
  async findManyEmployees(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Args() args: FindManyEmployeesArgs
  ): Promise<Employees[]> {
    return ctx.prisma.employees.findMany(args);
  }

  @TypeGraphQL.Mutation(() => Employees, {
    nullable: false,
    description: undefined,
  })
  async createEmployees(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Args() args: CreateEmployeesArgs
  ): Promise<Employees> {
    return ctx.prisma.employees.create(args);
  }

  @TypeGraphQL.Mutation(() => Employees, {
    nullable: false,
    description: undefined,
  })
  async updateEmployees(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Args() args: UpdateEmployeesArgs
  ): Promise<Employees> {
    return ctx.prisma.employees.update(args);
  }
}
