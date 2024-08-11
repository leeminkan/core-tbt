import { DeepPartial, Nullable, ShallowNever } from '@libs/core-shared';

import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '../repository.types';
import { Booking as BookingDomainEntity } from './booking.entity';

export type CreateBookingData = DeepPartial<BookingDomainEntity> &
  Pick<BookingDomainEntity, 'customerId' | 'startTime' | 'endTime'>;

export type UpdateBookingData = DeepPartial<BookingDomainEntity> &
  Partial<Pick<BookingDomainEntity, 'startTime' | 'endTime'>>;

export abstract class BookingRepository {
  abstract create(
    data: CreateBookingData,
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
    options?: RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>,
  ): Promise<Nullable<BookingDomainEntity>>;
  abstract findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<BookingDomainEntity>;

  abstract updateById(
    id: number,
    data: UpdateBookingData,
    options?: RepositoryOptions,
  ): void;
  abstract updateByIdVersion(
    where: { id: number; version: number },
    data: UpdateBookingData,
    options?: RepositoryOptions,
  ): void;

  abstract findAndUpdateById(
    id: number,
    data: UpdateBookingData,
    options?: RepositoryOptions,
  ): void;

  abstract deleteById(id: number, options?: RepositoryOptions): void;
}
