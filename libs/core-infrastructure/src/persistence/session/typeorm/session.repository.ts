import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Session as SessionDomainEntity } from '@app/core-domain';
import { RepositoryOptions } from '@app/core-infrastructure/types';
import { UnitOfWorkManager } from '@app/core-infrastructure/unit-of-work';
import { Session as SessionSchema } from './session.schema';
import { SessionMapper } from './session.mapper';

@Injectable()
export class SessionRepository extends Repository<SessionSchema> {
  constructor(private readonly dataSource: DataSource) {
    super(SessionSchema, dataSource.createEntityManager());
  }

  getRepository(manager?: UnitOfWorkManager) {
    if (!manager) return this;

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
    return SessionMapper.mapToDomain(session);
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
      data: data.map((item) => SessionMapper.mapToDomain(item)),
      totalCount,
    };
  }

  async findSessionById(id: string, options?: RepositoryOptions) {
    const repository = this.getRepository(options?.unitOfWorkManager);
    const session = await repository.findOneBy({ id });
    return session ? SessionMapper.mapToDomain(session) : null;
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
