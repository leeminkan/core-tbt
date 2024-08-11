import { Injectable } from '@nestjs/common';
import { Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import {
  CreateProductCategoryData,
  FindAllAndCountArgs,
  ProductCategory as ProductCategoryDomainEntity,
  ProductCategoryRepository as ProductCategoryRepositoryAbstract,
} from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';
import { RecordNotFoundException } from '@libs/core-infrastructure/base.errors';
import { DeepPartial, Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';

import { ProductCategoryMapper } from './product-category.mapper';
import { ProductCategory } from './product-category.schema';

@Injectable()
export class ProductCategoryRepository
  implements ProductCategoryRepositoryAbstract
{
  private mapper: ProductCategoryMapper;
  constructor(private readonly connection: Sequelize) {
    this.mapper = new ProductCategoryMapper();
  }

  getRepository() {
    return this.connection.getRepository(ProductCategory);
  }

  async create(
    { parentId, ...data }: CreateProductCategoryData,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    const result = await repository.create(
      {
        ...data,
        parent_id: parentId,
      },
      {
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );

    return this.mapper.mapToDomain(result);
  }

  async findAll(
    { ids, search, root, parentId, take, skip, sort }: FindAllAndCountArgs,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();

    const data = await repository.findAll({
      where: {
        ...(ids?.length && {
          id: ids,
        }),
        ...(search && {
          name: {
            [Op.like]: `%${search}%`,
          },
        }),
        ...(root
          ? {
              parent_id: {
                [Op.eq]: null,
              },
            }
          : parentId && {
              parent_id: parentId,
            }),
      },
      limit: take,
      offset: skip,
      ...(sort?.createdAt && {
        order: ['created_at', sort.createdAt],
      }),
      transaction: options?.unitOfWorkManager as Transaction,
    });

    return data.map((item) => this.mapper.mapToDomain(item));
  }

  async findAllAndCount(
    { search, root, parentId, take = 20, skip = 0, sort }: FindAllAndCountArgs,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();

    const { rows, count } = await repository.findAndCountAll({
      where: {
        ...(search && {
          name: {
            [Op.like]: `%${search}%`,
          },
        }),
        ...(root
          ? {
              parent_id: {
                [Op.eq]: null,
              },
            }
          : parentId && {
              parent_id: parentId,
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

    return {
      data: rows.map((item) => this.mapper.mapToDomain(item)),
      totalCount: count,
    };
  }

  async findChildren(
    parentId: number,
    {
      sort,
    }: {
      sort?: { createdAt?: SortDirection; name?: SortDirection };
    },
    options?: RepositoryOptions,
  ): Promise<ProductCategoryDomainEntity[]> {
    const repository = this.getRepository();

    const data = await repository.findAll({
      where: {
        parent_id: parentId,
      },
      ...(sort && {
        order: Object.entries(sort).map(([column, direction]) => {
          if (column === 'createdAt') return ['created_at', direction];
          return [column, direction];
        }),
      }),
      transaction: options?.unitOfWorkManager as Transaction,
    });

    return data.map((item) => this.mapper.mapToDomain(item));
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
    const repository = this.getRepository();
    const row = await repository.findOne({
      where: {
        id,
      },
      // include: [
      //   {
      //     model: ProductCategory,
      //     as: 'parent',
      //   },
      //   {
      //     model: ProductCategory,
      //     as: 'children',
      //     // Use a subquery to avoid duplicate rows due to multiple children
      //     separate: true,
      //     include: [
      //       {
      //         model: ProductCategory,
      //         as: 'parent',
      //         // Optionally include the parent of each child
      //         required: false,
      //       },
      //     ],
      //   },
      // ],
      transaction: options?.unitOfWorkManager as Transaction,
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
    data: DeepPartial<ProductCategoryDomainEntity>,
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
