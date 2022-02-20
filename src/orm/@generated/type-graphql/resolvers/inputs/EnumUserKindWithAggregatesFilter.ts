import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumUserKindFilter } from "../inputs/NestedEnumUserKindFilter";
import { NestedEnumUserKindWithAggregatesFilter } from "../inputs/NestedEnumUserKindWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { UserKind } from "../../enums/UserKind";

@TypeGraphQL.InputType("EnumUserKindWithAggregatesFilter", {
  isAbstract: true
})
export class EnumUserKindWithAggregatesFilter {
  @TypeGraphQL.Field(_type => UserKind, {
    nullable: true
  })
  equals?: "NORMAL" | "ADMIN" | undefined;

  @TypeGraphQL.Field(_type => [UserKind], {
    nullable: true
  })
  in?: Array<"NORMAL" | "ADMIN"> | undefined;

  @TypeGraphQL.Field(_type => [UserKind], {
    nullable: true
  })
  notIn?: Array<"NORMAL" | "ADMIN"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumUserKindWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumUserKindWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumUserKindFilter, {
    nullable: true
  })
  _min?: NestedEnumUserKindFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumUserKindFilter, {
    nullable: true
  })
  _max?: NestedEnumUserKindFilter | undefined;
}
