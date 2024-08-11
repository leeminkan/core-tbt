import { DeepPartial, Nullable } from '@libs/core-shared';

import { RepositoryOptions } from '../repository.types';
import { Session as SessionDomainEntity } from './session.entity';

export type CreateSessionData = DeepPartial<SessionDomainEntity> &
  Pick<SessionDomainEntity, 'userId'>;

export abstract class SessionRepository {
  abstract createSession(
    data: CreateSessionData,
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
