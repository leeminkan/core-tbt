import { UnitOfWorkManager } from '../../core-infrastructure/src/unit-of-work';

export type RepositoryOptions = {
  unitOfWorkManager?: UnitOfWorkManager;
};

export type ThrowNotFoundErrorOptions = {
  throwNotFoundError: boolean;
};
