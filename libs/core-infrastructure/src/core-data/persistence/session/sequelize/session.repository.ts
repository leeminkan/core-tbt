import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import {
  CreateSessionData,
  SessionRepository as SessionRepositoryAbstract,
  UpdateSessionData,
} from '@libs/core-domain';
import { RepositoryOptions } from '@libs/core-domain/repository.types';
import { SortDirection } from '@libs/core-shared/constants';

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
    { userId, authProvider, ...data }: CreateSessionData,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    const session = await repository.create(
      {
        ...data,
        user_id: userId,
        auth_provider: authProvider,
      },
      {
        transaction: options?.unitOfWorkManager as Transaction,
      },
    );

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
    const repository = this.getRepository();
    const { rows, count } = await repository.findAndCountAll({
      where: {
        user_id: userId,
      },
      limit: take,
      offset: skip,
      ...(sort && {
        order: Object.entries(sort).map(([column, direction]) => {
          if (column === 'createdAt') return ['created_at', direction];
          return [column, direction];
        }),
      }),
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
    { userId, authProvider, ...data }: UpdateSessionData,
    options?: RepositoryOptions,
  ) {
    const repository = this.getRepository();
    return await repository.update(
      {
        ...data,
        user_id: userId,
        auth_provider: authProvider,
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
