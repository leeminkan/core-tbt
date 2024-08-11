import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import {
  CreateSessionData,
  Session as SessionDomainEntity,
  SessionRepository as SessionRepositoryAbstract,
} from '@libs/core-domain';
import { RepositoryOptions } from '@libs/core-domain/repository.types';
import { DeepPartial } from '@libs/core-shared';

import { SessionMapper } from './session.mapper';
import { Session } from './session.schema';

@Injectable()
export class SessionRepository implements SessionRepositoryAbstract {
  private mapper: SessionMapper;
  constructor(private readonly connection: Sequelize) {
    this.mapper = new SessionMapper();
  }

  getRepository() {
    return this.connection.getRepository(Session);
  }

  async createSession(
    { userId, ...data }: CreateSessionData,
    options?: RepositoryOptions,
  ): Promise<SessionDomainEntity> {
    const repository = this.getRepository();
    const session = await repository.create(
      {
        ...data,
        user_id: userId,
      },
      {
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );

    return this.mapper.mapToDomain(session);
  }

  async findAllAndCountByUserId(
    userId: number,
    { take = 20, skip = 0 }: { take?: number; skip?: number },
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    const { rows, count } = await repository.findAndCountAll({
      where: {
        user_id: userId,
      },
      limit: take,
      offset: skip,
      transaction: options?.unitOfWorkManager as Transaction,
    });

    return {
      data: rows.map((item) => this.mapper.mapToDomain(item)),
      totalCount: count,
    };
  }

  async findSessionById(id: string, options?: RepositoryOptions) {
    const repository = this.getRepository();
    const row = await repository.findOne({
      where: {
        id,
      },
      transaction: options?.unitOfWorkManager as Transaction,
    });
    return row ? this.mapper.mapToDomain(row) : null;
  }

  async updateSessionById(
    id: string,
    { userId, ...data }: DeepPartial<SessionDomainEntity>,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    return await repository.update(
      {
        ...data,
        user_id: userId,
      },
      {
        where: {
          id,
        },
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );
  }
}
