import { plainToInstance } from 'class-transformer';
import { Booking as BookingDomainEntity } from '@app/core-domain';
import { BaseMapper } from '@app/core-infrastructure/base-mapper.abstract';

import { Booking as BookingOrmSchema } from './booking.schema';

export class BookingMapper
  implements BaseMapper<BookingDomainEntity, BookingOrmSchema>
{
  mapToORM(domainEntity: BookingDomainEntity): BookingOrmSchema {
    const orm = new BookingOrmSchema();
    orm.id = domainEntity.id;
    orm.customer_id = domainEntity.customerId;
    orm.start_time = domainEntity.startTime;
    orm.end_time = domainEntity.endTime;
    orm.status = domainEntity.status;
    orm.version = domainEntity.version;
    return orm;
  }

  mapToDomain(ormSchema: BookingOrmSchema): BookingDomainEntity {
    return plainToInstance(BookingDomainEntity, {
      id: ormSchema.id,
      customerId: ormSchema.customer_id,
      startTime: ormSchema.start_time,
      endTime: ormSchema.end_time,
      status: ormSchema.status,
      version: ormSchema.version,
    });
  }
}
