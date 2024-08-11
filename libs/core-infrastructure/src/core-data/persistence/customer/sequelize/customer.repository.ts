import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import {
  Customer as CustomerDomainEntity,
  CustomerRepository as CustomerRepositoryAbstract,
} from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';
import { RecordNotFoundException } from '@libs/core-infrastructure/base.errors';
import { DeepPartial, Nullable, ShallowNever } from '@libs/core-shared';

import { CustomerMapper } from './customer.mapper';
import { Customer } from './customer.schema';

@Injectable()
export class CustomerRepository implements CustomerRepositoryAbstract {
  private mapper: CustomerMapper;
  constructor(private readonly connection: Sequelize) {
    this.mapper = new CustomerMapper();
  }

  getRepository() {
    return this.connection.getRepository(Customer);
  }

  async create(
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    const result = await repository.create(data, {
      transaction: options?.unitOfWorkManager as Transaction,
    });

    return this.mapper.mapToDomain(result);
  }

  async findAllAndCount(
    {
      take = 20,
      skip = 0,
    }: {
      take?: number;
      skip?: number;
    },
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    const { rows, count } = await repository.findAndCountAll({
      limit: take,
      offset: skip,
      transaction: options?.unitOfWorkManager as Transaction,
    });

    return {
      data: rows.map((item) => this.mapper.mapToDomain(item)),
      totalCount: count,
    };
  }

  async findById(
    id: number,
    options?: RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>,
  ): Promise<Nullable<CustomerDomainEntity>>;
  async findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<CustomerDomainEntity>;
  async findById(
    id: number,
    options?:
      | (RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>)
      | (RepositoryOptions & ThrowNotFoundErrorOptions),
  ): Promise<Nullable<CustomerDomainEntity>> {
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

  async updateById(
    id: number,
    data: DeepPartial<CustomerDomainEntity>,
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
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );
  }

  async findAndUpdateById(
    id: number,
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const row = await this.findById(id, options);

    if (!row) {
      throw new RecordNotFoundException();
    }

    return await this.updateById(id, data, options);
  }

  async deleteById(id: number, options?: RepositoryOptions) {
    const repository = this.getRepository();
    return await repository.destroy({
      where: { id },
      transaction: options?.unitOfWorkManager as Transaction,
    });
  }
}
