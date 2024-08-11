import { DeepPartial, Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';

import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '../repository.types';
import { ProductCategory as ProductCategoryDomainEntity } from './product-category.entity';

export type FindAllAndCountArgs = {
  ids?: number[];
  search?: string;
  root?: boolean;
  parentId?: number;
  take?: number;
  skip?: number;
  sort?: {
    createdAt?: SortDirection;
  };
};

export type CreateProductCategoryData =
  DeepPartial<ProductCategoryDomainEntity> &
    Pick<ProductCategoryDomainEntity, 'parentId' | 'name' | 'description'>;

export abstract class ProductCategoryRepository {
  abstract create(
    data: CreateProductCategoryData,
    options?: RepositoryOptions,
  ): Promise<ProductCategoryDomainEntity>;

  abstract findAll(
    args: FindAllAndCountArgs,
    options?: RepositoryOptions,
  ): Promise<ProductCategoryDomainEntity[]>;

  abstract findAllAndCount(
    args: FindAllAndCountArgs,
    options?: RepositoryOptions,
  ): Promise<{
    data: ProductCategoryDomainEntity[];
    totalCount: number;
  }>;

  abstract findById(
    id: number,
    options?: RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>,
  ): Promise<Nullable<ProductCategoryDomainEntity>>;
  abstract findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<ProductCategoryDomainEntity>;

  abstract findChildren(
    parentId: number,
    args: {
      sort?: {
        createdAt?: SortDirection;
        name?: SortDirection;
      };
    },
    options?: RepositoryOptions,
  ): Promise<ProductCategoryDomainEntity[]>;

  abstract updateById(
    id: number,
    data: DeepPartial<ProductCategoryDomainEntity>,
    options?: RepositoryOptions,
  ): void;

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<ProductCategoryDomainEntity>,
    options?: RepositoryOptions,
  ): void;

  abstract deleteById(id: number, options?: RepositoryOptions): void;
  abstract deleteByIds(ids: number[], options?: RepositoryOptions): void;
}
