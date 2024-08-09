import { Booking as BookingDomainEntity } from '@libs/core-domain';
import { RepositoryOptions } from '@libs/core-domain/repository.types';
import { DeepPartial, Nullable } from '@libs/core-shared';

export abstract class BookingRepository {
  abstract create(
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  ): Promise<BookingDomainEntity>;

  abstract findAllAndCount(
    args: {
      take?: number;
      skip?: number;
    },
    options?: RepositoryOptions,
  ): Promise<{
    data: BookingDomainEntity[];
    totalCount: number;
  }>;

  abstract findById(
    id: number,
    options?: RepositoryOptions,
  ): Promise<Nullable<BookingDomainEntity>>;

  abstract updateById(
    id: number,
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  ): void;
  abstract updateByIdVersion(
    where: { id: number; version: number },
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  ): void;

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  ): void;

  abstract deleteById(id: number, options?: RepositoryOptions): void;
}
