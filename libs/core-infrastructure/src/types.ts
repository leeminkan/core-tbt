import { UnitOfWorkManager } from './unit-of-work';

export type RepositoryOptions = {
  unitOfWorkManager?: UnitOfWorkManager;
};

export type ThrowNotFoundErrorOptions = {
  throwNotFoundError: boolean;
};

export type Nullable<V> = V | null;
export type Maybe<V> = V | undefined;
export type OrNeverType<T> = T | never;
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
export type ShallowNever<T> = {
  [P in keyof T]?: never;
};
