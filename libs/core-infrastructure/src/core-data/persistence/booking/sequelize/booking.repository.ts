import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import {
  Booking as BookingDomainEntity,
  BookingRepository as BookingRepositoryAbstract,
  CreateBookingData,
  UpdateBookingData,
  bookingStatus,
} from '@libs/core-domain';
import {
  RepositoryOptions,
  ThrowNotFoundErrorOptions,
} from '@libs/core-domain/repository.types';
import {
  RecordNotFoundException,
  VersionMismatchError,
} from '@libs/core-infrastructure/base.errors';
import { Nullable, ShallowNever } from '@libs/core-shared';

import { BookingMapper } from './booking.mapper';
import { Booking } from './booking.schema';

@Injectable()
export class BookingRepository implements BookingRepositoryAbstract {
  private mapper: BookingMapper;
  constructor(private readonly connection: Sequelize) {
    this.mapper = new BookingMapper();
  }

  getRepository() {
    return this.connection.getRepository(Booking);
  }

  async create(data: CreateBookingData, options?: RepositoryOptions) {
    const repository = this.getRepository();
    const result = await repository.create(
      {
        customer_id: data.customerId,
        start_time: data.startTime,
        end_time: data.endTime,
        status: data.status ?? bookingStatus.CREATED,
        version: data.version ?? 1,
      },
      {
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );

    return this.mapper.mapToDomain(result);
  }

  async findAllAndCount(
    {
      take = 20,
      skip = 0,
    }: {
      take?: number;
      skip?: number;
    },
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    const { rows, count } = await repository.findAndCountAll({
      limit: take,
      offset: skip,
      transaction: options?.unitOfWorkManager as Transaction,
    });

    return {
      data: rows.map((item) => this.mapper.mapToDomain(item)),
      totalCount: count,
    };
  }

  async findById(
    id: number,
    options?: RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>,
  ): Promise<Nullable<BookingDomainEntity>>;
  async findById(
    id: number,
    options: RepositoryOptions & ThrowNotFoundErrorOptions,
  ): Promise<BookingDomainEntity>;
  async findById(
    id: number,
    options?:
      | (RepositoryOptions & ShallowNever<ThrowNotFoundErrorOptions>)
      | (RepositoryOptions & ThrowNotFoundErrorOptions),
  ): Promise<Nullable<BookingDomainEntity>> {
    const repository = this.getRepository();
    const row = await repository.findOne({
      where: {
        id,
      },
      transaction: options?.unitOfWorkManager as Transaction,
    });

    if (!row) {
      if (
        options &&
        'throwNotFoundError' in options &&
        options.throwNotFoundError
      ) {
        throw new RecordNotFoundException();
      }
      return null;
    }

    return this.mapper.mapToDomain(row);
  }

  async updateById(
    id: number,
    data: UpdateBookingData,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    return await repository.update(
      {
        ...data,
        customer_id: data.customerId,
        start_time: data.startTime,
        end_time: data.endTime,
        version: Sequelize.literal('version + 1'),
      },
      {
        where: {
          id,
        },
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );
  }

  async updateByIdVersion(
    { id, version }: { id: number; version: number },
    data: UpdateBookingData,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    const [affected] = await repository.update(
      {
        ...data,
        customer_id: data.customerId,
        start_time: data.startTime,
        end_time: data.endTime,
        version: Sequelize.literal('version + 1'),
      },
      {
        where: {
          id,
          version,
        },
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );

    if (affected === 0) {
      throw new VersionMismatchError();
    }
  }

  async findAndUpdateById(
    id: number,
    data: UpdateBookingData,
    options?: RepositoryOptions,
  ) {
    const row = await this.findById(id, options);

    if (!row) {
      throw new RecordNotFoundException();
    }

    return await this.updateById(id, data, options);
  }

  async deleteById(id: number, options?: RepositoryOptions) {
    const repository = this.getRepository();
    return await repository.destroy({
      where: { id },
      transaction: options?.unitOfWorkManager as Transaction,
    });
  }
}
