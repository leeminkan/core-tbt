import {
  Between,
  DataSource,
  DeepPartial,
  EntityManager,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { difference } from 'lodash';

import { Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';
import {
  Product as ProductDomainEntity,
  ProductRepository as ProductRepositoryAbstract,
} from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';
import { RecordNotFoundException } from '@libs/core-infrastructure/base.errors';
import { UnitOfWorkManager } from '@libs/core-infrastructure/unit-of-work';

import { Product as ProductSchema } from './product.schema';
import { ProductMapper } from './product.mapper';
import { ProductCategoryAssociation } from './product-category-association.schema';

@Injectable()
export class ProductRepository implements ProductRepositoryAbstract {
  private repository: Repository<ProductSchema>;
  private mapper: ProductMapper;
  private productCategoryAssociationRepository: Repository<ProductCategoryAssociation>;

  constructor(private dataSource: DataSource) {
    const entityManager = dataSource.createEntityManager();
    this.repository = new Repository<ProductSchema>(
      ProductSchema,
      entityManager,
    );
    this.productCategoryAssociationRepository =
      new Repository<ProductCategoryAssociation>(
        ProductCategoryAssociation,
        entityManager,
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

    if (data.categoryIds && data.categoryIds.length) {
      await this.productCategoryAssociationRepository
        .createQueryBuilder()
        .insert()
        .orIgnore(true)
        .into(ProductCategoryAssociation)
        .values(
          data.categoryIds.map((item) => ({
            product_id: persistedData.id,
            category_id: item,
          })),
        )
        .updateEntity(false)
        .execute();
    }

    return this.mapper.mapToDomain(persistedData, {
      categoryIds: data.categoryIds ?? [],
    });
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

    const categories = await this.productCategoryAssociationRepository.find({
      where: {
        product_id: In(data.map((item) => item.id)),
      },
    });

    return {
      data: data.map((product) => {
        const categoryIds = categories
          .filter((item) => item.product_id === product.id)
          .map((item) => item.category_id);

        return this.mapper.mapToDomain(product, {
          categoryIds,
        });
      }),
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

    const categories = await this.productCategoryAssociationRepository.find({
      where: {
        product_id: row.id,
      },
    });

    return this.mapper.mapToDomain(row, {
      categoryIds: categories.map((item) => item.category_id),
    });
  }

  async updateById(
    id: number,
    { categoryIds = [], ...data }: DeepPartial<ProductDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);

    const currentCategories =
      await this.productCategoryAssociationRepository.find({
        where: {
          product_id: id,
        },
      });
    const currentCategoryIds = currentCategories.map(
      (item) => item.category_id,
    );

    const idsToRemove = difference(currentCategoryIds, categoryIds);
    const idsToAdd = difference(categoryIds, currentCategoryIds);
    if (idsToRemove.length) {
      await this.productCategoryAssociationRepository.delete({
        product_id: id,
        category_id: In(idsToRemove),
      });
    }
    if (idsToAdd.length) {
      await this.productCategoryAssociationRepository
        .createQueryBuilder()
        .insert()
        .orIgnore(true)
        .into(ProductCategoryAssociation)
        .values(
          idsToAdd.map((item) => ({
            product_id: id,
            category_id: item,
          })),
        )
        .updateEntity(false)
        .execute();
    }

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
