import { DeepPartial } from 'typeorm';
import { Customer as CustomerDomainEntity } from '@app/core-domain';
import {
  Nullable,
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@app/core-infrastructure/types';

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

  // TODO: function overload does not work well with autocomplete! Pls check...
  abstract findById(
    id: number,
    options?: RepositoryOptions,
  ): Promise<Nullable<CustomerDomainEntity>>;

  abstract findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<CustomerDomainEntity>;

  abstract updateById(
    id: number,
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract deleteById(id: number, options?: RepositoryOptions);
}
