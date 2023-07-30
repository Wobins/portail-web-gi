import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerDefinition = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Definition, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly term?: string | null;
  readonly meaning?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDefinition = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Definition, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly term?: string | null;
  readonly meaning?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Definition = LazyLoading extends LazyLoadingDisabled ? EagerDefinition : LazyDefinition

export declare const Definition: (new (init: ModelInit<Definition>) => Definition) & {
  copyOf(source: Definition, mutator: (draft: MutableModel<Definition>) => MutableModel<Definition> | void): Definition;
}