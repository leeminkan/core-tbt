import { DeepPartial } from 'typeorm';
import { User as UserDomainEntity } from '@app/core-domain';
import { RepositoryOptions } from '@app/core-infrastructure/types';

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

  abstract findUserById(
    id: number,
    options?: RepositoryOptions,
  ): Promise<UserDomainEntity>;

  abstract findUserByUsername(
    username: string,
    options?: RepositoryOptions,
  ): Promise<UserDomainEntity>;

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
