import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { NestedEnumUserKindFilter } from '../inputs/NestedEnumUserKindFilter';
import { UserKind } from '../../enums/UserKind';

@TypeGraphQL.InputType('EnumUserKindFilter', {
  isAbstract: true,
})
export class EnumUserKindFilter {
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
