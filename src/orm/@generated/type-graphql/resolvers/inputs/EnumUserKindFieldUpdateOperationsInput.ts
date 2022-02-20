import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserKind } from '../../enums/UserKind';

@TypeGraphQL.InputType('EnumUserKindFieldUpdateOperationsInput', {
  isAbstract: true,
})
export class EnumUserKindFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => UserKind, {
    nullable: true,
  })
  set?: 'NORMAL' | 'ADMIN' | undefined;
}
