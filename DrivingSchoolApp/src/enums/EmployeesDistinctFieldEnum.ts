import * as TypeGraphQL from "type-graphql";

export enum EmployeesDistinctFieldEnum {
  id = "id",
  employee_number = "employee_number",
  first_name = "first_name",
  middle_name = "middle_name",
  last_name = "last_name",
  email_id = "email_id",
  dob = "dob",
  gender = "gender",
  contact_no = "contact_no",
  alt_contact_no = "alt_contact_no",
  address_id = "address_id",
  photo_url = "photo_url",
  entity_id = "entity_id",
  default_branch_id = "default_branch_id",
  hire_date = "hire_date",
  leaving_date = "leaving_date",
  supervisior_id = "supervisior_id",
  department_type = "department_type",
  position_title = "position_title",
  job_title = "job_title",
  identity_id = "identity_id",
  created_by = "created_by",
  created_date = "created_date",
  last_updated_by = "last_updated_by",
  last_updated_date = "last_updated_date",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  employee_id = "employee_id"
}
TypeGraphQL.registerEnumType(EmployeesDistinctFieldEnum, {
  name: "EmployeesDistinctFieldEnum",
  description: undefined,
});
