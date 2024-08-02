import { DeepPartial } from 'typeorm';
import { Booking as BookingDomainEntity } from '@app/core-domain';
import { Nullable, RepositoryOptions } from '@app/core-infrastructure/types';

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
  );
  abstract updateByIdVersion(
    where: { id: number; version: number },
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract findAndUpdateById(
    id: number,
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract deleteById(id: number, options?: RepositoryOptions);
}
