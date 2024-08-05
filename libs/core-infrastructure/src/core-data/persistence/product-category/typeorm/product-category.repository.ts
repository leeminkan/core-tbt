import {
  DataSource,
  DeepPartial,
  EntityManager,
  ILike,
  Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';
import { ProductCategory as ProductCategoryDomainEntity } from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-infrastructure/core-data/repository.types';
import { RecordNotFoundException } from '@libs/core-infrastructure/base.errors';
import { UnitOfWorkManager } from '@libs/core-infrastructure/unit-of-work';

import { ProductCategoryRepository as ProductCategoryRepositoryAbstract } from '../product-category-repository.abstract';
import { ProductCategory as ProductCategorySchema } from './product-category.schema';
import { ProductCategoryMapper } from './product-category.mapper';

@Injectable()
export class ProductCategoryRepository
  implements ProductCategoryRepositoryAbstract
{
  private repository: Repository<ProductCategorySchema>;
  private mapper: ProductCategoryMapper;

  constructor(private dataSource: DataSource) {
    this.repository = new Repository<ProductCategorySchema>(
      ProductCategorySchema,
      dataSource.createEntityManager(),
    );
    this.mapper = new ProductCategoryMapper();
  }

  getRepository(manager?: UnitOfWorkManager) {
    if (!manager) return this.repository;

    if (!(manager instanceof EntityManager)) {
      throw new Error('Manager is not supported');
    }

    return manager.withRepository(
      new Repository(ProductCategorySchema, manager),
    );
  }

  async create(
    data: DeepPartial<ProductCategoryDomainEntity>,
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
      take = 20,
      skip = 0,
      sort,
    }: {
      search?: string;
      take?: number;
      skip?: number;
      sort?: {
        createdAt: SortDirection;
      };
    },
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);

    const [data, totalCount] = await repository.findAndCount({
      where: {
        ...(search && {
          name: ILike(`%${search}%`),
        }),
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
  ): Promise<Nullable<ProductCategoryDomainEntity>>;
  async findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<ProductCategoryDomainEntity>;
  async findById(
    id: number,
    options?:
      | (RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>)
      | (RepositoryOptions & ThrowNotFoundErrorOptions),
  ): Promise<Nullable<ProductCategoryDomainEntity>> {
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
    data: DeepPartial<ProductCategoryDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.update(id, { ...data });
  }

  async findAndUpdateById(
    id: number,
    data: DeepPartial<ProductCategoryDomainEntity>,
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
