import { DeepPartial } from 'typeorm';
import { Session as SessionDomainEntity } from '@app/core-domain';

export abstract class SessionRepository {
  abstract createSession(data: DeepPartial<SessionDomainEntity>);

  abstract findAllAndCountByUserId(
    userId: number,
    agrs: { take?: number; skip?: number },
  );

  abstract findSessionById(id: string);

  abstract updateSessionById(
    id: string,
    data: DeepPartial<SessionDomainEntity>,
  );
}
