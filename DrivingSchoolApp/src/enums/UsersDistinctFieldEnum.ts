import * as TypeGraphQL from "type-graphql";

export enum UsersDistinctFieldEnum {
  user_id = "user_id",
  username = "username",
  pass = "pass",
  user_type = "user_type",
  start_date = "start_date",
  end_date = "end_date",
  employee_role = "employee_role",
  created_by = "created_by",
  created_date = "created_date",
  updated_date = "updated_date",
  updated_by = "updated_by",
  user_link_id = "user_link_id",
  entity_id = "entity_id",
  branch_id1 = "branch_id1",
  branch_id2 = "branch_id2",
  branch_id3 = "branch_id3",
  branch_id4 = "branch_id4",
  branch_id5 = "branch_id5",
  branch_id6 = "branch_id6",
  branch_id7 = "branch_id7",
  branch_id8 = "branch_id8",
  branch_id9 = "branch_id9",
  branch_id10 = "branch_id10",
  branch_id11 = "branch_id11",
  branch_id12 = "branch_id12"
}
TypeGraphQL.registerEnumType(UsersDistinctFieldEnum, {
  name: "UsersDistinctFieldEnum",
  description: undefined,
});
