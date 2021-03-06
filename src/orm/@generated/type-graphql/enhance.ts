import { ClassType } from 'type-graphql';
import * as tslib from 'tslib';
import * as crudResolvers from './resolvers/crud/resolvers-crud.index';
import * as argsTypes from './resolvers/crud/args.index';
import * as actionResolvers from './resolvers/crud/resolvers-actions.index';
import * as models from './models';
import * as outputTypes from './resolvers/outputs';
import * as inputTypes from './resolvers/inputs';

const crudResolversMap = {
  User: crudResolvers.UserCrudResolver,
};
const actionResolversMap = {
  User: {
    user: actionResolvers.FindUniqueUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    users: actionResolvers.FindManyUserResolver,
    createUser: actionResolvers.CreateUserResolver,
    createManyUser: actionResolvers.CreateManyUserResolver,
    deleteUser: actionResolvers.DeleteUserResolver,
    updateUser: actionResolvers.UpdateUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    upsertUser: actionResolvers.UpsertUserResolver,
    aggregateUser: actionResolvers.AggregateUserResolver,
    groupByUser: actionResolvers.GroupByUserResolver,
  },
};
const crudResolversInfo = {
  User: [
    'user',
    'findFirstUser',
    'users',
    'createUser',
    'createManyUser',
    'deleteUser',
    'updateUser',
    'deleteManyUser',
    'updateManyUser',
    'upsertUser',
    'aggregateUser',
    'groupByUser',
  ],
};
const argsInfo = {
  FindUniqueUserArgs: ['where'],
  FindFirstUserArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyUserArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateUserArgs: ['data'],
  CreateManyUserArgs: ['data', 'skipDuplicates'],
  DeleteUserArgs: ['where'],
  UpdateUserArgs: ['data', 'where'],
  DeleteManyUserArgs: ['where'],
  UpdateManyUserArgs: ['data', 'where'],
  UpsertUserArgs: ['where', 'create', 'update'],
  AggregateUserArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByUserArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<TModel extends ResolverModelNames> =
  keyof typeof crudResolversMap[TModel]['prototype'];

export type ResolverActionsConfig<TModel extends ResolverModelNames> = Partial<
  Record<ModelResolverActionNames<TModel> | '_all', MethodDecorator[]>
>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(resolversEnhanceMap: ResolversEnhanceMap) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (
          actionResolversConfig[
            resolverActionName as keyof typeof actionResolversConfig
          ] as Function
        ).prototype;
        tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
        tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter((it) => it !== '_all');
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (
        actionResolversConfig[resolverActionName as keyof typeof actionResolversConfig] as Function
      ).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]['prototype'],
  number | symbol
>;

type ArgFieldsConfig<TArgsType extends ArgsTypesNames> = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(argsTypesEnhanceMap: ArgsTypesEnhanceMap) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo]
    );
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | '_all', PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<TEnhanceConfig extends TypeConfig, TType extends object>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter((it) => it !== '_all');
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  User: ['id', 'email', 'age', 'kind'],
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]['prototype'],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<ModelFieldNames<TModel>>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo]
    );
  }
}

const outputsInfo = {
  AggregateUser: ['_count', '_avg', '_sum', '_min', '_max'],
  UserGroupBy: ['id', 'email', 'age', 'kind', '_count', '_avg', '_sum', '_min', '_max'],
  AffectedRowsOutput: ['count'],
  UserCountAggregate: ['id', 'email', 'age', 'kind', '_all'],
  UserAvgAggregate: ['age'],
  UserSumAggregate: ['age'],
  UserMinAggregate: ['id', 'email', 'age', 'kind'],
  UserMaxAggregate: ['id', 'email', 'age', 'kind'],
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]['prototype'],
  number | symbol
>;

type OutputTypeFieldsConfig<TOutput extends OutputTypesNames> = FieldsConfig<
  OutputTypeFieldNames<TOutput>
>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(outputTypesEnhanceMap: OutputTypesEnhanceMap) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo]
    );
  }
}

const inputsInfo = {
  UserWhereInput: ['AND', 'OR', 'NOT', 'id', 'email', 'age', 'kind'],
  UserOrderByWithRelationInput: ['id', 'email', 'age', 'kind'],
  UserWhereUniqueInput: ['id', 'email'],
  UserOrderByWithAggregationInput: [
    'id',
    'email',
    'age',
    'kind',
    '_count',
    '_avg',
    '_max',
    '_min',
    '_sum',
  ],
  UserScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'email', 'age', 'kind'],
  UserCreateInput: ['id', 'email', 'age', 'kind'],
  UserUpdateInput: ['id', 'email', 'age', 'kind'],
  UserCreateManyInput: ['id', 'email', 'age', 'kind'],
  UserUpdateManyMutationInput: ['id', 'email', 'age', 'kind'],
  StringFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'mode',
    'not',
  ],
  IntNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  EnumUserKindFilter: ['equals', 'in', 'notIn', 'not'],
  UserCountOrderByAggregateInput: ['id', 'email', 'age', 'kind'],
  UserAvgOrderByAggregateInput: ['age'],
  UserMaxOrderByAggregateInput: ['id', 'email', 'age', 'kind'],
  UserMinOrderByAggregateInput: ['id', 'email', 'age', 'kind'],
  UserSumOrderByAggregateInput: ['age'],
  StringWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'mode',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  IntNullableWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'not',
    '_count',
    '_avg',
    '_sum',
    '_min',
    '_max',
  ],
  EnumUserKindWithAggregatesFilter: ['equals', 'in', 'notIn', 'not', '_count', '_min', '_max'],
  StringFieldUpdateOperationsInput: ['set'],
  NullableIntFieldUpdateOperationsInput: ['set', 'increment', 'decrement', 'multiply', 'divide'],
  EnumUserKindFieldUpdateOperationsInput: ['set'],
  NestedStringFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'not',
  ],
  NestedIntNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedEnumUserKindFilter: ['equals', 'in', 'notIn', 'not'],
  NestedStringWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  NestedIntFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedIntNullableWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'not',
    '_count',
    '_avg',
    '_sum',
    '_min',
    '_max',
  ],
  NestedFloatNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedEnumUserKindWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'not',
    '_count',
    '_min',
    '_max',
  ],
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]['prototype'],
  number | symbol
>;

type InputTypeFieldsConfig<TInput extends InputTypesNames> = FieldsConfig<
  InputTypeFieldNames<TInput>
>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(inputTypesEnhanceMap: InputTypesEnhanceMap) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo]
    );
  }
}
