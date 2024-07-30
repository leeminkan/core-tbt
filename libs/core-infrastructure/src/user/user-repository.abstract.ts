import { DeepPartial } from 'typeorm';
import { User as UserDomainEntity } from '@app/core-domain';

export abstract class UserRepository {
  abstract createUser(
    data: DeepPartial<UserDomainEntity>,
  ): Promise<UserDomainEntity>;

  abstract findAllAndCountUser(args: {
    take?: number;
    skip?: number;
  }): Promise<{
    data: UserDomainEntity[];
    totalCount: number;
  }>;

  abstract findUserById(id: number): Promise<UserDomainEntity>;

  abstract findUserByUsername(username: string): Promise<UserDomainEntity>;

  abstract updateUserById(id: number, data: DeepPartial<UserDomainEntity>);

  abstract findAndUpdateUserById(
    id: number,
    data: DeepPartial<UserDomainEntity>,
  );

  abstract deleteUserById(id: number);
}
