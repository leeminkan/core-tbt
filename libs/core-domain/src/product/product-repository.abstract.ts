import { DeepPartial, Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';

import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '../repository.types';
import { Product as ProductDomainEntity } from './product.entity';

export type CreateProductData = DeepPartial<
  Omit<ProductDomainEntity, 'name' | 'description' | 'price' | 'categoryIds'>
> &
  Pick<ProductDomainEntity, 'name' | 'description' | 'price' | 'categoryIds'>;

export type UpdateProductData = DeepPartial<
  Omit<ProductDomainEntity, 'categoryIds'>
> &
  Partial<Pick<ProductDomainEntity, 'categoryIds'>>;

export abstract class ProductRepository {
  abstract create(
    data: CreateProductData,
    options?: RepositoryOptions,
  ): Promise<ProductDomainEntity>;

  abstract findAllAndCount(
    args: {
      search?: string;
      fromPrice?: number;
      toPrice?: number;
      take?: number;
      skip?: number;
      sort?: {
        createdAt?: SortDirection;
      };
    },
    options?: RepositoryOptions,
  ): Promise<{
    data: ProductDomainEntity[];
    totalCount: number;
  }>;

  abstract findById(
    id: number,
    options?: RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>,
  ): Promise<Nullable<ProductDomainEntity>>;
  abstract findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<ProductDomainEntity>;

  abstract updateById(
    id: number,
    data: UpdateProductData,
    options?: RepositoryOptions,
  ): void;

  abstract findAndUpdateById(
    id: number,
    data: UpdateProductData,
    options?: RepositoryOptions,
  ): void;

  abstract deleteById(id: number, options?: RepositoryOptions): void;
  abstract deleteByIds(ids: number[], options?: RepositoryOptions): void;
}
