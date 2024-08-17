import { DeepPartial, Nullable } from '@libs/core-shared';
import { SortDirection } from '@libs/core-shared/constants';

import { RepositoryOptions } from '../repository.types';
import { Session as SessionDomainEntity } from './session.entity';

export type CreateSessionData = DeepPartial<
  Omit<SessionDomainEntity, 'isLogout'>
> &
  Pick<SessionDomainEntity, 'userId' | 'authProvider' | 'properties'>;

export type UpdateSessionData = DeepPartial<SessionDomainEntity> &
  Partial<Pick<SessionDomainEntity, 'properties'>>;

export abstract class SessionRepository {
  abstract createSession(
    data: CreateSessionData,
    options?: RepositoryOptions,
  ): Promise<SessionDomainEntity>;

  abstract findAllAndCountByUserId(
    userId: number,
    agrs: {
      take?: number;
      skip?: number;
      sort?: {
        createdAt: SortDirection;
      };
    },
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
    data: UpdateSessionData,
    options?: RepositoryOptions,
  ): void;
}
