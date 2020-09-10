import * as TypeGraphQL from "type-graphql";

export enum Gdpr_consentDistinctFieldEnum {
  consent_id = "consent_id",
  course_id = "course_id",
  customer_id = "customer_id",
  consent_received_flag = "consent_received_flag",
  consent_date = "consent_date",
  consent_method = "consent_method",
  create_date = "create_date"
}
TypeGraphQL.registerEnumType(Gdpr_consentDistinctFieldEnum, {
  name: "Gdpr_consentDistinctFieldEnum",
  description: undefined,
});
