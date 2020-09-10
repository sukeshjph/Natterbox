import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { Address } from "./Address";

@TypeGraphQL.ObjectType({
  isAbstract: true,
  description: undefined,
})
export class Employees {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
    description: undefined,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  employee_number?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  first_name?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  middle_name?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  last_name?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  email_id?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
    description: undefined,
  })
  dob?: Date | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  gender?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  contact_no?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  alt_contact_no?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
    description: undefined,
  })
  address_id?: number | undefined;

  address?: Address;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  photo_url?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
    description: undefined,
  })
  entity_id?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
    description: undefined,
  })
  default_branch_id?: number | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
    description: undefined,
  })
  hire_date?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
    description: undefined,
  })
  leaving_date?: Date | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
    description: undefined,
  })
  supervisior_id?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  department_type?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  position_title?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
    description: undefined,
  })
  job_title?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
    description: undefined,
  })
  identity_id?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
    description: undefined,
  })
  created_by?: number | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
    description: undefined,
  })
  created_date?: Date | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
    description: undefined,
  })
  last_updated_by?: number | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
    description: undefined,
  })
  last_updated_date?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
    description: undefined,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
    description: undefined,
  })
  updatedAt!: Date;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
    description: undefined,
  })
  employee_id?: number | undefined;
}
