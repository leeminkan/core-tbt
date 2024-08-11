import { DeepPartial, Nullable, ShallowNever } from '@libs/core-shared';

import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '../repository.types';
import { Customer as CustomerDomainEntity } from './customer.entity';

export abstract class CustomerRepository {
  abstract create(
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  ): Promise<CustomerDomainEntity>;

  abstract findAllAndCount(
    args: {
      take?: number;
      skip?: number;
    },
    options?: RepositoryOptions,
  ): Promise<{
    data: CustomerDomainEntity[];
    totalCount: number;
  }>;

  abstract findById(
    id: number,
    options?: RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>,
  ): Promise<Nullable<CustomerDomainEntity>>;
  abstract findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<CustomerDomainEntity>;

  abstract updateById(
    id: number,
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  ): void;

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  ): void;

  abstract deleteById(id: number, options?: RepositoryOptions): void;
}
