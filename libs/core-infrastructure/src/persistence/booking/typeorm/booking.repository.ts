import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Booking as BookingDomainEntity } from '@app/core-domain';
import { RepositoryOptions } from '@app/core-infrastructure/types';
import { UnitOfWorkManager } from '@app/core-infrastructure/unit-of-work';
import { VersionMismatchError } from '@app/core-infrastructure/base.errors';
import { BookingRepository as BookingRepositoryAbstract } from '../booking-repository.abstract';
import { Booking as BookingSchema } from './booking.schema';
import { BookingMapper } from './booking.mapper';

@Injectable()
export class BookingRepository implements BookingRepositoryAbstract {
  private repository: Repository<BookingSchema>;
  private mapper: BookingMapper;

  constructor(private dataSource: DataSource) {
    this.repository = new Repository<BookingSchema>(
      BookingSchema,
      dataSource.createEntityManager(),
    );
    this.mapper = new BookingMapper();
  }

  getRepository(manager?: UnitOfWorkManager) {
    if (!manager) return this.repository;

    if (!(manager instanceof EntityManager)) {
      throw new Error('Manager is not supported');
    }

    return manager.withRepository(new Repository(BookingSchema, manager));
  }

  async create(
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const prepareData = repository.create({
      customer_id: data.customerId,
      start_time: data.startTime,
      end_time: data.endTime,
      status: data.status,
      version: data.version,
    });
    const persistedData = await repository.save(prepareData);
    return this.mapper.mapToDomain(persistedData);
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
    const repository = this.getRepository(options?.unitOfWorkManager);
    const [data, totalCount] = await repository.findAndCount({
      take,
      skip,
    });

    return {
      data: data.map((item) => this.mapper.mapToDomain(item)),
      totalCount,
    };
  }

  async findById(id: number, options?: RepositoryOptions) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const row = await repository.findOneBy({ id });
    return row ? this.mapper.mapToDomain(row) : null;
  }

  async updateById(
    id: number,
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.update(id, {
      customer_id: data.customerId,
      start_time: data.startTime,
      end_time: data.endTime,
      status: data.status,
    });
  }

  async updateByIdVersion(
    { id, version }: { id: number; version: number },
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const result = await repository.update(
      {
        id,
        version,
      },
      {
        customer_id: data.customerId,
        start_time: data.startTime,
        end_time: data.endTime,
        status: data.status,
      },
    );

    if (result.affected === 0) {
      throw new VersionMismatchError();
    }
  }

  async findAndUpdateById(
    id: number,
    data: DeepPartial<BookingDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const row = await this.findById(id, options);

    if (!row) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return await this.updateById(id, data, options);
  }

  async deleteById(id: number, options?: RepositoryOptions) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.delete(id);
  }
}
