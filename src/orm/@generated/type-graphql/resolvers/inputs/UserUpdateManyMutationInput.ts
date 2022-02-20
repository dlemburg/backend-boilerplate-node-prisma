import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { EnumUserKindFieldUpdateOperationsInput } from '../inputs/EnumUserKindFieldUpdateOperationsInput';
import { NullableIntFieldUpdateOperationsInput } from '../inputs/NullableIntFieldUpdateOperationsInput';
import { StringFieldUpdateOperationsInput } from '../inputs/StringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('UserUpdateManyMutationInput', {
  isAbstract: true,
})
export class UserUpdateManyMutationInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  id?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  email?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableIntFieldUpdateOperationsInput, {
    nullable: true,
  })
  age?: NullableIntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumUserKindFieldUpdateOperationsInput, {
    nullable: true,
  })
  kind?: EnumUserKindFieldUpdateOperationsInput | undefined;
}
