import { DeepPartial, Nullable } from '@libs/core-shared';
import { User as UserDomainEntity } from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';

export abstract class UserRepository {
  abstract createUser(
    data: DeepPartial<UserDomainEntity>,
    options?: RepositoryOptions,
  ): Promise<UserDomainEntity>;

  abstract findAllAndCountUser(
    args: {
      take?: number;
      skip?: number;
    },
    options?: RepositoryOptions,
  ): Promise<{
    data: UserDomainEntity[];
    totalCount: number;
  }>;

  abstract findById(
    id: number,
    options?: RepositoryOptions,
  ): Promise<Nullable<UserDomainEntity>>;

  abstract findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<UserDomainEntity>;

  abstract findUserByUsername(
    username: string,
    options?: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<Nullable<UserDomainEntity>>;

  abstract updateUserById(
    id: number,
    data: DeepPartial<UserDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract findAndUpdateUserById(
    id: number,
    data: DeepPartial<UserDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract deleteUserById(id: number, options?: RepositoryOptions);
}
