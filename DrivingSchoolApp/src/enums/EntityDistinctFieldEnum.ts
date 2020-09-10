import * as TypeGraphQL from "type-graphql";

export enum EntityDistinctFieldEnum {
  entity_id = "entity_id",
  name = "name",
  reg_num = "reg_num",
  vat_num = "vat_num",
  logo_url = "logo_url",
  primary_contact_firstname = "primary_contact_firstname",
  primary_contact_lastname = "primary_contact_lastname",
  email_id = "email_id",
  contact_number = "contact_number",
  alt_contact_number = "alt_contact_number",
  base_currency = "base_currency",
  tax_profile_country = "tax_profile_country",
  address_id = "address_id",
  active_flag = "active_flag",
  branch_count = "branch_count"
}
TypeGraphQL.registerEnumType(EntityDistinctFieldEnum, {
  name: "EntityDistinctFieldEnum",
  description: undefined,
});
