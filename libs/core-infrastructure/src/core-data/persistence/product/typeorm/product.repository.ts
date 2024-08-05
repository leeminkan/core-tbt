import {
  Between,
  DataSource,
  DeepPartial,
  EntityManager,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';
import { Product as ProductDomainEntity } from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-infrastructure/core-data/repository.types';
import { RecordNotFoundException } from '@libs/core-infrastructure/base.errors';
import { UnitOfWorkManager } from '@libs/core-infrastructure/unit-of-work';

import { ProductRepository as ProductRepositoryAbstract } from '../product-repository.abstract';
import { Product as ProductSchema } from './product.schema';
import { ProductMapper } from './product.mapper';

@Injectable()
export class ProductRepository implements ProductRepositoryAbstract {
  private repository: Repository<ProductSchema>;
  private mapper: ProductMapper;

  constructor(private dataSource: DataSource) {
    this.repository = new Repository<ProductSchema>(
      ProductSchema,
      dataSource.createEntityManager(),
    );
    this.mapper = new ProductMapper();
  }

  getRepository(manager?: UnitOfWorkManager) {
    if (!manager) return this.repository;

    if (!(manager instanceof EntityManager)) {
      throw new Error('Manager is not supported');
    }

    return manager.withRepository(new Repository(ProductSchema, manager));
  }

  async create(
    data: DeepPartial<ProductDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const prepareData = repository.create({
      ...data,
    });
    const persistedData = await repository.save(prepareData);
    return this.mapper.mapToDomain(persistedData);
  }

  async findAllAndCount(
    {
      search,
      fromPrice,
      toPrice,
      take = 20,
      skip = 0,
      sort,
    }: {
      search?: string;
      fromPrice?: number;
      toPrice?: number;
      take?: number;
      skip?: number;
      sort?: {
        createdAt: SortDirection;
      };
    },
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);

    let priceWhere;
    if (fromPrice && toPrice) {
      priceWhere = Between(fromPrice, toPrice);
    } else if (fromPrice) {
      priceWhere = MoreThanOrEqual(fromPrice);
    } else if (toPrice) {
      priceWhere = LessThanOrEqual(toPrice);
    }

    const [data, totalCount] = await repository.findAndCount({
      where: {
        ...(search && {
          name: ILike(`%${search}%`),
        }),
        price: priceWhere,
      },
      take,
      skip,
      ...(sort?.createdAt && {
        order: {
          created_at: sort.createdAt,
        },
      }),
    });

    return {
      data: data.map((item) => this.mapper.mapToDomain(item)),
      totalCount,
    };
  }

  async findById(
    id: number,
    options?: RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>,
  ): Promise<Nullable<ProductDomainEntity>>;
  async findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<ProductDomainEntity>;
  async findById(
    id: number,
    options?:
      | (RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>)
      | (RepositoryOptions & ThrowNotFoundErrorOptions),
  ): Promise<Nullable<ProductDomainEntity>> {
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
    data: DeepPartial<ProductDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.update(id, { ...data });
  }

  async findAndUpdateById(
    id: number,
    data: DeepPartial<ProductDomainEntity>,
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

  async deleteByIds(ids: number[], options?: RepositoryOptions) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.delete(ids);
  }
}
