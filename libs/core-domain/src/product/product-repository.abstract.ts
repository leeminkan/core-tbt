import { DeepPartial, Nullable, ShallowNever } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';
import { Product as ProductDomainEntity } from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';

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
  );

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<ProductDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract deleteById(id: number, options?: RepositoryOptions);
  abstract deleteByIds(ids: number[], options?: RepositoryOptions);
}
