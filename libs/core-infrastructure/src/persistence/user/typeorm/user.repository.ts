import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User as UserDomainEntity } from '@app/core-domain';
import {
  Nullable,
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@app/core-infrastructure/types';
import { UnitOfWorkManager } from '@app/core-infrastructure/unit-of-work';
import { UserRepository as UserRepositoryAbstract } from '../user-repository.abstract';
import { User as UserSchema } from './user.schema';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements UserRepositoryAbstract {
  private repository: Repository<UserSchema>;
  private mapper: UserMapper;

  constructor(private dataSource: DataSource) {
    this.repository = new Repository<UserSchema>(
      UserSchema,
      dataSource.createEntityManager(),
    );
    this.mapper = new UserMapper();
  }

  getRepository(manager?: UnitOfWorkManager) {
    if (!manager) return this.repository;

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
    return this.mapper.mapToDomain(user);
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
      data: data.map((item) => this.mapper.mapToDomain(item)),
      totalCount,
    };
  }

  async findById(
    id: number,
    options?: RepositoryOptions,
  ): Promise<Nullable<UserDomainEntity>>;
  async findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<UserDomainEntity>;
  async findById(
    id: number,
    options?:
      | RepositoryOptions
      | (RepositoryOptions & ThrowNotFoundErrorOptions),
  ): Promise<Nullable<UserDomainEntity>> {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const row = await repository.findOneBy({ id });

    if (!row) {
      if (
        options &&
        'throwNotFoundError' in options &&
        options.throwNotFoundError
      ) {
        throw new NotFoundException(`Record with ID ${id} not found`);
      }
      return null;
    }

    return this.mapper.mapToDomain(row);
  }

  async findUserByUsername(
    username: string,
    options?: RepositoryOptions & ThrowNotFoundErrorOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const user = await repository.findOneBy({ username });

    if (!user) {
      if (options?.throwNotFoundError) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      return null;
    }

    return this.mapper.mapToDomain(user);
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
    const user = await this.findById(id, options);

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
