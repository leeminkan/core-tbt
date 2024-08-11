import { UnitOfWorkManager } from '@libs/core-infrastructure';

// TODO: need to decouple with core-infrastructure
export type RepositoryOptions = {
  unitOfWorkManager?: UnitOfWorkManager;
};

export type ThrowNotFoundErrorOptions = {
  throwNotFoundError: boolean;
};
