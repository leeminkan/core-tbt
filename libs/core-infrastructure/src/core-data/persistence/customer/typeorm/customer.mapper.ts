import { plainToInstance } from 'class-transformer';
import { Customer as CustomerDomainEntity } from '@libs/core-domain';
import { BaseMapper } from '@libs/core-infrastructure/base-mapper.abstract';

import { Customer as CustomerInfrastructureSchema } from './customer.schema';

export class CustomerMapper
  implements BaseMapper<CustomerDomainEntity, CustomerInfrastructureSchema>
{
  mapToORM(domainEntity: CustomerDomainEntity): CustomerInfrastructureSchema {
    const orm = new CustomerInfrastructureSchema();
    orm.id = domainEntity.id;
    orm.first_name = domainEntity.firstName;
    orm.last_name = domainEntity.lastName;
    return orm;
  }

  mapToDomain(
    InfrastructureSchema: CustomerInfrastructureSchema,
  ): CustomerDomainEntity {
    return plainToInstance(CustomerDomainEntity, {
      id: InfrastructureSchema.id,
      firstName: InfrastructureSchema.first_name,
      lastName: InfrastructureSchema.last_name,
    });
  }
}
