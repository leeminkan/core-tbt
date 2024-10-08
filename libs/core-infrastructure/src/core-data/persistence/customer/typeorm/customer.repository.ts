import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';

import {
  Customer as CustomerDomainEntity,
  CustomerRepository as CustomerRepositoryAbstract,
} from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';
import { UnitOfWorkManager } from '@libs/core-infrastructure';
import { RecordNotFoundException } from '@libs/core-infrastructure/base.errors';
import { Nullable, ShallowNever } from '@libs/core-shared';

import { CustomerMapper } from './customer.mapper';
import { Customer as CustomerSchema } from './customer.schema';

@Injectable()
export class CustomerRepository implements CustomerRepositoryAbstract {
  private repository: Repository<CustomerSchema>;
  private mapper: CustomerMapper;

  constructor(private dataSource: DataSource) {
    this.repository = new Repository<CustomerSchema>(
      CustomerSchema,
      dataSource.createEntityManager(),
    );
    this.mapper = new CustomerMapper();
  }

  getRepository(manager?: UnitOfWorkManager) {
    if (!manager) return this.repository;

    if (!(manager instanceof EntityManager)) {
      throw new Error('Manager is not supported');
    }

    return manager.withRepository(new Repository(CustomerSchema, manager));
  }

  async create(
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const prepareData = repository.create({
      first_name: data.firstName,
      last_name: data.lastName,
    });
    const persistedData = await repository.save(prepareData);
    return this.mapper.mapToDomain(persistedData);
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
    const repository = this.getRepository(options?.unitOfWorkManager);
    const row = await repository.findOneBy({ id });

    if (!row) {
      if (
        options &&
        'throwNotFoundError' in options &&
        options.throwNotFoundError
      ) {
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
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.update(id, { ...data });
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
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.delete(id);
  }
}
