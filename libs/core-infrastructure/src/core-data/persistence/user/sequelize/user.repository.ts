import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import {
  User as UserDomainEntity,
  UserRepository as UserRepositoryAbstract,
} from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';
import { RecordNotFoundException } from '@libs/core-infrastructure/base.errors';
import { DeepPartial, Nullable } from '@libs/core-shared';

import { UserMapper } from './user.mapper';
import { User } from './user.schema';

@Injectable()
export class UserRepository implements UserRepositoryAbstract {
  private mapper: UserMapper;
  constructor(private readonly connection: Sequelize) {
    this.mapper = new UserMapper();
  }

  getRepository() {
    return this.connection.getRepository(User);
  }

  async createUser(
    data: DeepPartial<UserDomainEntity>,
    options?: RepositoryOptions,
  ): Promise<UserDomainEntity> {
    const repository = this.getRepository();
    const user = await repository.create(data, {
      transaction: options?.unitOfWorkManager as Transaction | undefined,
    });

    return this.mapper.mapToDomain(user);
  }

  async findAllAndCountUser(
    { take, skip }: { take?: number; skip?: number },
    options?: RepositoryOptions,
  ): Promise<{ data: UserDomainEntity[]; totalCount: number }> {
    const repository = this.getRepository();
    const { rows, count } = await repository.findAndCountAll({
      limit: take,
      offset: skip,
      transaction: options?.unitOfWorkManager as Transaction | undefined,
    });

    return {
      data: rows.map((item) => this.mapper.mapToDomain(item)),
      totalCount: count,
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
    const repository = this.getRepository();
    const row = await repository.findOne({
      where: {
        id,
      },
    });

    if (!row) {
      if (
        options &&
        'throwNotFoundError' in options &&
        options.throwNotFoundError
      ) {
        throw new RecordNotFoundException();
      }
      return null;
    }

    return this.mapper.mapToDomain(row);
  }

  async findUserByUsername(
    username: string,
    options?: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<Nullable<UserDomainEntity>> {
    const repository = this.getRepository();
    const user = await repository.findOne({
      where: { username },
      transaction: options?.unitOfWorkManager as Transaction | undefined,
    });

    if (!user) {
      if (options?.throwNotFoundError) {
        throw new RecordNotFoundException();
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
    const repository = this.getRepository();
    return await repository.update(
      {
        ...data,
      },
      {
        where: {
          id,
        },
        transaction: options?.unitOfWorkManager as Transaction | undefined,
      },
    );
  }

  async findAndUpdateUserById(
    id: number,
    data: DeepPartial<UserDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const user = await this.findById(id, options);

    if (!user) {
      throw new RecordNotFoundException();
    }

    return await this.updateUserById(id, data, options);
  }

  async deleteUserById(id: number, options?: RepositoryOptions) {
    const repository = this.getRepository();
    return await repository.destroy({
      where: { id },
      transaction: options?.unitOfWorkManager as Transaction | undefined,
    });
  }
}
