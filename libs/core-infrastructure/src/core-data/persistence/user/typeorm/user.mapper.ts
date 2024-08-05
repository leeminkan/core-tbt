import { plainToInstance } from 'class-transformer';

import { User as UserDomainEntity } from '@libs/core-domain';
import { BaseMapper } from '@libs/core-infrastructure/base-mapper.abstract';

import { User as UserInfrastructureSchema } from './user.schema';

export class UserMapper
  implements BaseMapper<UserDomainEntity, UserInfrastructureSchema>
{
  mapToORM(userEntity: UserDomainEntity): UserInfrastructureSchema {
    const orm = new UserInfrastructureSchema();
    orm.id = userEntity.id;
    orm.username = userEntity.username;
    orm.password = userEntity.password;
    return orm;
  }

  mapToDomain(userOrm: UserInfrastructureSchema): UserDomainEntity {
    return plainToInstance(UserDomainEntity, {
      id: userOrm.id,
      username: userOrm.username,
      password: userOrm.password,
    });
  }
}
