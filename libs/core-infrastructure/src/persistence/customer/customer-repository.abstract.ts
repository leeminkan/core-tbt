import { DeepPartial } from 'typeorm';
import { Customer as CustomerDomainEntity } from '@app/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@app/core-infrastructure/types';
import { Nullable, ShallowNever } from '@app/core-shared';

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
  );

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<CustomerDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract deleteById(id: number, options?: RepositoryOptions);
}
