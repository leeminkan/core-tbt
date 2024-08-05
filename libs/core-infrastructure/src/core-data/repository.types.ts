import { UnitOfWorkManager } from '../unit-of-work';

export type RepositoryOptions = {
  unitOfWorkManager?: UnitOfWorkManager;
};

export type ThrowNotFoundErrorOptions = {
  throwNotFoundError: boolean;
};
