import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserKind } from '../../enums/UserKind';

@TypeGraphQL.InputType('NestedEnumUserKindFilter', {
  isAbstract: true,
})
export class NestedEnumUserKindFilter {
  @TypeGraphQL.Field((_type) => UserKind, {
    nullable: true,
  })
  equals?: 'NORMAL' | 'ADMIN' | undefined;

  @TypeGraphQL.Field((_type) => [UserKind], {
    nullable: true,
  })
  in?: Array<'NORMAL' | 'ADMIN'> | undefined;

  @TypeGraphQL.Field((_type) => [UserKind], {
    nullable: true,
  })
  notIn?: Array<'NORMAL' | 'ADMIN'> | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumUserKindFilter, {
    nullable: true,
  })
  not?: NestedEnumUserKindFilter | undefined;
}
