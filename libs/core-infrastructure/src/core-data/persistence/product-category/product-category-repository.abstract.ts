import { DeepPartial } from 'typeorm';

import { Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';
import { ProductCategory as ProductCategoryDomainEntity } from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-infrastructure/core-data/repository.types';

export abstract class ProductCategoryRepository {
  abstract create(
    data: DeepPartial<ProductCategoryDomainEntity>,
    options?: RepositoryOptions,
  ): Promise<ProductCategoryDomainEntity>;

  abstract findAllAndCount(
    args: {
      search?: string;
      take?: number;
      skip?: number;
      sort?: {
        createdAt?: SortDirection;
      };
    },
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

  abstract updateById(
    id: number,
    data: DeepPartial<ProductCategoryDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<ProductCategoryDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract deleteById(id: number, options?: RepositoryOptions);
  abstract deleteByIds(ids: number[], options?: RepositoryOptions);
}
