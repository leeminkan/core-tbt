import { plainToInstance } from 'class-transformer';

import { Session as SessionDomainEntity } from '@libs/core-domain';

import { Session as SessionInfrastructureSchema } from './session.schema';

export class SessionMapper {
  mapToORM(sessionEntity: SessionDomainEntity): SessionInfrastructureSchema {
    const orm = new SessionInfrastructureSchema();
    orm.id = sessionEntity.id;
    orm.user_id = sessionEntity.userId;
    orm.is_logout = sessionEntity.isLogout;
    orm.hash = sessionEntity.hash;
    orm.auth_provider = sessionEntity.authProvider;
    orm.properties = sessionEntity.properties;
    return orm;
  }

  mapToDomain(sessionOrm: SessionInfrastructureSchema): SessionDomainEntity {
    return plainToInstance(SessionDomainEntity, {
      id: sessionOrm.id,
      userId: sessionOrm.user_id,
      isLogout: sessionOrm.is_logout,
      hash: sessionOrm.hash,
      authProvider: sessionOrm.auth_provider,
      properties: sessionOrm.properties,
    } as SessionDomainEntity);
  }
}
