import { plainToInstance } from 'class-transformer';
import { Session as SessionDomainEntity } from '@app/core-domain';

import { Session as SessionOrmSchema } from './session.schema';

export class SessionMapper {
  static mapToORM(sessionEntity: SessionDomainEntity): SessionOrmSchema {
    const orm = new SessionOrmSchema();
    orm.id = sessionEntity.id;
    orm.user_id = sessionEntity.userId;
    orm.is_logout = sessionEntity.isLogout;
    orm.hash = sessionEntity.hash;
    return orm;
  }

  static mapToDomain(sessionOrm: SessionOrmSchema): SessionDomainEntity {
    return plainToInstance(SessionDomainEntity, {
      id: sessionOrm.id,
      userId: sessionOrm.user_id,
      isLogout: sessionOrm.is_logout,
      hash: sessionOrm.hash,
    });
  }
}
