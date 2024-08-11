import { Injectable } from '@nestjs/common';
import { difference } from 'lodash';
import { Op, Transaction, WhereAttributeHashValue } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import {
  CreateProductData,
  Product as ProductDomainEntity,
  ProductRepository as ProductRepositoryAbstract,
  UpdateProductData,
} from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';
import { RecordNotFoundException } from '@libs/core-infrastructure/base.errors';
import { Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';

import { ProductCategoryAssociation } from './product-category-association.schema';
import { ProductMapper } from './product.mapper';
import { Product } from './product.schema';

@Injectable()
export class ProductRepository implements ProductRepositoryAbstract {
  private mapper: ProductMapper;
  constructor(private readonly connection: Sequelize) {
    this.mapper = new ProductMapper();
  }

  getRepository() {
    return this.connection.getRepository(Product);
  }

  getProductCategoryAssociationRepository() {
    return this.connection.getRepository(ProductCategoryAssociation);
  }

  async create(data: CreateProductData, options?: RepositoryOptions) {
    const repository = this.getRepository();
    const productCategoryAssociationRepository =
      this.getProductCategoryAssociationRepository();

    const persistedData = await repository.create(
      {
        ...data,
      },
      {
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );

    if (data.categoryIds && data.categoryIds.length) {
      await productCategoryAssociationRepository.bulkCreate(
        data.categoryIds.map((item) => ({
          product_id: persistedData.id,
          category_id: item,
        })),
        {
          ignoreDuplicates: true,
          transaction: options?.unitOfWorkManager as Transaction,
        },
      );
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
    const repository = this.getRepository();
    const productCategoryAssociationRepository =
      this.getProductCategoryAssociationRepository();

    let priceWhere: WhereAttributeHashValue<number>;
    if (fromPrice && toPrice) {
      priceWhere = {
        [Op.between]: [fromPrice, toPrice],
      };
    } else if (fromPrice) {
      priceWhere = {
        [Op.gte]: fromPrice,
      };
    } else if (toPrice) {
      priceWhere = {
        [Op.lte]: toPrice,
      };
    }

    const { rows, count } = await repository.findAndCountAll({
      where: {
        ...(search && {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        }),
        ...(priceWhere && {
          price: priceWhere,
        }),
      },
      limit: take,
      offset: skip,
      ...(sort && {
        order: Object.entries(sort).map(([column, direction]) => {
          if (column === 'createdAt') return ['created_at', direction];
          return [column, direction];
        }),
      }),
      transaction: options?.unitOfWorkManager as Transaction,
    });

    const categories = await productCategoryAssociationRepository.findAll({
      where: {
        product_id: {
          [Op.in]: rows.map((item) => item.id),
        },
      },
      transaction: options?.unitOfWorkManager as Transaction,
    });

    return {
      data: rows.map((product) => {
        const categoryIds = categories
          .filter((item) => item.product_id === product.id)
          .map((item) => item.category_id);

        return this.mapper.mapToDomain(product, {
          categoryIds,
        });
      }),
      totalCount: count,
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
    const repository = this.getRepository();

    const row = await repository.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ProductCategoryAssociation,
          as: 'productCategoryAssociations',
        },
      ],
      transaction: options?.unitOfWorkManager as Transaction,
    });

    if (!row) {
      if (
        options &&
        'throwNotFoundError' in options &&
        options.throwNotFoundError
      ) {
      }
      return null;
    }

    return this.mapper.mapToDomain(row, {
      categoryIds:
        row.productCategoryAssociations?.map((item) => item.category_id) ?? [],
    });
  }

  async updateById(
    id: number,
    { categoryIds = [], ...data }: UpdateProductData,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    const productCategoryAssociationRepository =
      this.getProductCategoryAssociationRepository();

    const currentCategories =
      await productCategoryAssociationRepository.findAll({
        where: {
          product_id: id,
        },
        transaction: options?.unitOfWorkManager as Transaction,
      });
    const currentCategoryIds = currentCategories.map(
      (item) => item.category_id,
    );

    const idsToRemove = difference(currentCategoryIds, categoryIds);
    const idsToAdd = difference(categoryIds, currentCategoryIds);

    if (idsToRemove.length) {
      await productCategoryAssociationRepository.destroy({
        where: {
          product_id: id,
          category_id: {
            [Op.in]: idsToRemove,
          },
        },
        transaction: options?.unitOfWorkManager as Transaction,
      });
    }
    if (idsToAdd.length) {
      await productCategoryAssociationRepository.bulkCreate(
        idsToAdd.map((item) => ({
          product_id: id,
          category_id: item,
        })),
        {
          ignoreDuplicates: true,
          transaction: options?.unitOfWorkManager as Transaction,
        },
      );
    }
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
    data: UpdateProductData,
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

  async deleteByIds(ids: number[], options?: RepositoryOptions) {
    const repository = this.getRepository();
    return await repository.destroy({
      where: { id: ids },
      transaction: options?.unitOfWorkManager as Transaction,
    });
  }
}
