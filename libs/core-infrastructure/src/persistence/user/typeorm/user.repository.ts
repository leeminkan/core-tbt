import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User as UserDomainEntity } from '@app/core-domain';
import { RepositoryOptions } from '@app/core-infrastructure/types';
import { UnitOfWorkManager } from '@app/core-infrastructure/unit-of-work';
import { UserRepository as UserRepositoryAbstract } from '../user-repository.abstract';
import { User as UserSchema } from './user.schema';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository
  extends Repository<UserSchema>
  implements UserRepositoryAbstract
{
  constructor(private dataSource: DataSource) {
    super(UserSchema, dataSource.createEntityManager());
  }

  getRepository(manager?: UnitOfWorkManager) {
    if (!manager) return this;

    if (!(manager instanceof EntityManager)) {
      throw new Error('Manager is not supported');
    }

    return manager.withRepository(new Repository(UserSchema, manager));
  }

  async createUser(
    data: DeepPartial<UserDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const prepareUser = repository.create(data);
    const user = await repository.save(prepareUser);
    return UserMapper.mapToDomain(user);
  }

  async findAllAndCountUser(
    {
      take = 20,
      skip = 0,
    }: {
      take?: number;
      skip?: number;
    },
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const [data, totalCount] = await repository.findAndCount({
      take,
      skip,
    });

    return {
      data: data.map((item) => UserMapper.mapToDomain(item)),
      totalCount,
    };
  }

  async findUserById(id: number, options?: RepositoryOptions) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const user = await repository.findOneBy({ id });
    return user ? UserMapper.mapToDomain(user) : null;
  }

  async findUserByUsername(username: string, options?: RepositoryOptions) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const user = await repository.findOneBy({ username });
    return user ? UserMapper.mapToDomain(user) : null;
  }

  async updateUserById(
    id: number,
    data: DeepPartial<UserDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.update(id, { ...data });
  }

  async findAndUpdateUserById(
    id: number,
    data: DeepPartial<UserDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const user = await this.findUserById(id, options);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.updateUserById(id, data, options);
  }

  async deleteUserById(id: number, options?: RepositoryOptions) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.delete(id);
  }
}
