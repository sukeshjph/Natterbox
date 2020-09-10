import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { SortOrder } from "../enums/SortOrder";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class EmployeesOrderByInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  id?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  employee_number?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  first_name?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  middle_name?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  last_name?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  email_id?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  dob?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  gender?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  contact_no?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  alt_contact_no?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  address_id?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  photo_url?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  entity_id?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  default_branch_id?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  hire_date?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  leaving_date?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  supervisior_id?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  department_type?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  position_title?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  job_title?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  identity_id?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  created_by?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  created_date?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  last_updated_by?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  last_updated_date?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  createdAt?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  updatedAt?: keyof typeof SortOrder | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
    description: undefined,
  })
  employee_id?: keyof typeof SortOrder | undefined;
}
