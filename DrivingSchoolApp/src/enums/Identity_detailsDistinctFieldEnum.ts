import * as TypeGraphQL from "type-graphql";

export enum Identity_detailsDistinctFieldEnum {
  identity_id = "identity_id",
  identity_type = "identity_type",
  issue_date = "issue_date",
  expiry_date = "expiry_date",
  verified_date = "verified_date",
  verified_by = "verified_by",
  expiry_status = "expiry_status",
  created_by = "created_by",
  created_date = "created_date",
  last_updated_by = "last_updated_by",
  last_updated_date = "last_updated_date",
  image_url = "image_url"
}
TypeGraphQL.registerEnumType(Identity_detailsDistinctFieldEnum, {
  name: "Identity_detailsDistinctFieldEnum",
  description: undefined,
});
