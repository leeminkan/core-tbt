import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';

import {
  Session as SessionDomainEntity,
  SessionRepository as SessionRepositoryAbstract,
} from '@libs/core-domain';
import { RepositoryOptions } from '@libs/core-domain/repository.types';
import { UnitOfWorkManager } from '@libs/core-infrastructure';

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
    { userId, ...data }: DeepPartial<SessionDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const prepareSession = repository.create({
      ...data,
      user_id: userId,
    });
    const session = await repository.save(prepareSession);
    return this.mapper.mapToDomain(session);
  }

  async findAllAndCountByUserId(
    userId: number,
    { take = 20, skip = 0 }: { take?: number; skip?: number },
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const [data, totalCount] = await repository.findAndCount({
      where: {
        user_id: userId,
      },
      take,
      skip,
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
    { userId, ...data }: DeepPartial<SessionDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    return await repository.update(id, { ...data, user_id: userId });
  }
}
