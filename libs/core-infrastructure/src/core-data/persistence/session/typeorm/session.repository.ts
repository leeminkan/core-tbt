import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import {
  CreateSessionData,
  SessionRepository as SessionRepositoryAbstract,
  UpdateSessionData,
} from '@libs/core-domain';
import { RepositoryOptions } from '@libs/core-domain/repository.types';
import { UnitOfWorkManager } from '@libs/core-infrastructure';
import { SortDirection } from '@libs/core-shared/constants';

import { SessionMapper } from './session.mapper';
import { Session as SessionSchema } from './session.schema';

@Injectable()
export class SessionRepository implements SessionRepositoryAbstract {
  private repository: Repository<SessionSchema>;
  private mapper: SessionMapper;

  constructor(private dataSource: DataSource) {
    this.repository = new Repository<SessionSchema>(
      SessionSchema,
      dataSource.createEntityManager(),
    );
    this.mapper = new SessionMapper();
  }

  getRepository(manager?: UnitOfWorkManager) {
    if (!manager) return this.repository;

    if (!(manager instanceof EntityManager)) {
      throw new Error('Manager is not supported');
    }

    return manager.withRepository(new Repository(SessionSchema, manager));
  }

  async createSession(
    { userId, authProvider, ...data }: CreateSessionData,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const prepareSession = repository.create({
      ...data,
      user_id: userId,
      auth_provider: authProvider,
    });
    const session = await repository.save(prepareSession);
    return this.mapper.mapToDomain(session);
  }

  async findAllAndCountByUserId(
    userId: number,
    {
      take = 20,
      skip = 0,
      sort,
    }: {
      take?: number;
      skip?: number;
      sort?: {
        createdAt: SortDirection;
      };
    },
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const [data, totalCount] = await repository.findAndCount({
      where: {
        user_id: userId,
      },
      take,
      skip,
      ...(sort?.createdAt && {
        order: {
          created_at: sort.createdAt,
        },
      }),
    });

    return {
      data: data.map((item) => this.mapper.mapToDomain(item)),
      totalCount,
    };
  }

  async findSessionById(id: string, options?: RepositoryOptions) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const session = await repository.findOneBy({ id });
    return session ? this.mapper.mapToDomain(session) : null;
  }

  async updateSessionById(
    id: string,
    { userId, authProvider, isLogout, ...data }: UpdateSessionData,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.update(id, {
      ...data,
      user_id: userId,
      auth_provider: authProvider,
      is_logout: isLogout,
    });
  }
}
