import { Product as ProductDomainEntity } from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';
import { DeepPartial, Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';

export abstract class ProductRepository {
  abstract create(
    data: DeepPartial<ProductDomainEntity>,
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
    data: DeepPartial<ProductDomainEntity>,
    options?: RepositoryOptions,
  ): void;

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<ProductDomainEntity>,
    options?: RepositoryOptions,
  ): void;

  abstract deleteById(id: number, options?: RepositoryOptions): void;
  abstract deleteByIds(ids: number[], options?: RepositoryOptions): void;
}
