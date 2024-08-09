import { Session as SessionDomainEntity } from '@libs/core-domain';
import { RepositoryOptions } from '@libs/core-domain/repository.types';
import { DeepPartial, Nullable } from '@libs/core-shared';

export abstract class SessionRepository {
  abstract createSession(
    data: DeepPartial<SessionDomainEntity>,
    options?: RepositoryOptions,
  ): Promise<SessionDomainEntity>;

  abstract findAllAndCountByUserId(
    userId: number,
    agrs: { take?: number; skip?: number },
    options?: RepositoryOptions,
  ): Promise<{
    data: SessionDomainEntity[];
    totalCount: number;
  }>;

  abstract findSessionById(
    id: string,
    options?: RepositoryOptions,
  ): Promise<Nullable<SessionDomainEntity>>;

  abstract updateSessionById(
    id: string,
    data: DeepPartial<SessionDomainEntity>,
    options?: RepositoryOptions,
  ): void;
}
