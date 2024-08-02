import { plainToInstance } from 'class-transformer';
import { User as UserDomainEntity } from '@app/core-domain';
import { BaseMapper } from '@app/core-infrastructure/base-mapper.abstract';

import { User as UserOrmSchema } from './user.schema';

export class UserMapper implements BaseMapper<UserDomainEntity, UserOrmSchema> {
  mapToORM(userEntity: UserDomainEntity): UserOrmSchema {
    const orm = new UserOrmSchema();
    orm.id = userEntity.id;
    orm.username = userEntity.username;
    orm.password = userEntity.password;
    return orm;
  }

  mapToDomain(userOrm: UserOrmSchema): UserDomainEntity {
    return plainToInstance(UserDomainEntity, {
      id: userOrm.id,
      username: userOrm.username,
      password: userOrm.password,
    });
  }
}
