import { DeepPartial } from '@libs/core-shared';
import { Session as SessionDomainEntity } from '@libs/core-domain';
import { RepositoryOptions } from '@libs/core-domain/repository.types';

export abstract class SessionRepository {
  abstract createSession(
    data: DeepPartial<SessionDomainEntity>,
    options?: RepositoryOptions,
  );

  abstract findAllAndCountByUserId(
    userId: number,
    agrs: { take?: number; skip?: number },
    options?: RepositoryOptions,
  );

  abstract findSessionById(id: string, options?: RepositoryOptions);

  abstract updateSessionById(
    id: string,
    data: DeepPartial<SessionDomainEntity>,
    options?: RepositoryOptions,
  );
}
