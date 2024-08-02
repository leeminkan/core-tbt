import { plainToInstance } from 'class-transformer';
import { Customer as CustomerDomainEntity } from '@app/core-domain';
import { BaseMapper } from '@app/core-infrastructure/base-mapper.abstract';

import { Customer as CustomerOrmSchema } from './customer.schema';

export class CustomerMapper
  implements BaseMapper<CustomerDomainEntity, CustomerOrmSchema>
{
  mapToORM(domainEntity: CustomerDomainEntity): CustomerOrmSchema {
    const orm = new CustomerOrmSchema();
    orm.id = domainEntity.id;
    orm.first_name = domainEntity.firstName;
    orm.last_name = domainEntity.lastName;
    return orm;
  }

  mapToDomain(ormSchema: CustomerOrmSchema): CustomerDomainEntity {
    return plainToInstance(CustomerDomainEntity, {
      id: ormSchema.id,
      firstName: ormSchema.first_name,
      lastName: ormSchema.last_name,
    });
  }
}
