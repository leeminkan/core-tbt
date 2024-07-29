import { plainToInstance } from 'class-transformer';
import { User as UserDomainEntity } from '@app/core-domain';

import { User as UserOrmSchema } from './user.schema';

export class UserMapper {
  static mapToORM(userEntity: UserDomainEntity): UserOrmSchema {
    const orm = new UserOrmSchema();
    orm.id = userEntity.id;
    orm.username = userEntity.username;
    orm.password = userEntity.password;
    return orm;
  }

  static mapToDomain(userOrm: UserOrmSchema): UserDomainEntity {
    return plainToInstance(UserDomainEntity, {
      id: userOrm.id,
      username: userOrm.username,
      password: userOrm.password,
    });
  }
}
