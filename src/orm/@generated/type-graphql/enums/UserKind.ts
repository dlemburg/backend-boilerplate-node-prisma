import * as TypeGraphQL from "type-graphql";

export enum UserKind {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}
TypeGraphQL.registerEnumType(UserKind, {
  name: "UserKind",
  description: undefined,
});
