import { plainToInstance } from 'class-transformer';
import { Booking as BookingDomainEntity } from '@libs/core-domain';
import { BaseMapper } from '@libs/core-infrastructure/base-mapper.abstract';

import { Booking as BookingInfrastructureSchema } from './booking.schema';

export class BookingMapper
  implements BaseMapper<BookingDomainEntity, BookingInfrastructureSchema>
{
  mapToORM(domainEntity: BookingDomainEntity): BookingInfrastructureSchema {
    const orm = new BookingInfrastructureSchema();
    orm.id = domainEntity.id;
    orm.customer_id = domainEntity.customerId;
    orm.start_time = domainEntity.startTime;
    orm.end_time = domainEntity.endTime;
    orm.status = domainEntity.status;
    orm.version = domainEntity.version;
    return orm;
  }

  mapToDomain(
    InfrastructureSchema: BookingInfrastructureSchema,
  ): BookingDomainEntity {
    return plainToInstance(BookingDomainEntity, {
      id: InfrastructureSchema.id,
      customerId: InfrastructureSchema.customer_id,
      startTime: InfrastructureSchema.start_time,
      endTime: InfrastructureSchema.end_time,
      status: InfrastructureSchema.status,
      version: InfrastructureSchema.version,
    });
  }
}
