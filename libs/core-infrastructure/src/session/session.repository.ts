import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Session as SessionSchema } from './session.schema';
import { SessionMapper } from './session.mapper';

@Injectable()
export class SessionRepository extends Repository<SessionSchema> {
  constructor(private dataSource: DataSource) {
    super(SessionSchema, dataSource.createEntityManager());
  }

  async createSession(data: DeepPartial<SessionSchema>) {
    const prepareSession = this.create(data);
    const session = await this.save(prepareSession);
    return SessionMapper.mapToDomain(session);
  }

  async findAllAndCountByUserId(
    userId: number,
    { take = 20, skip = 0 }: { take?: number; skip?: number },
  ) {
    const [data, totalCount] = await this.findAndCount({
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

  async findSessionById(id: string) {
    const session = await this.findOneBy({ id });
    return session ? SessionMapper.mapToDomain(session) : null;
  }

  async updateUserById(id: number, data: DeepPartial<SessionSchema>) {
    return await this.update(id, { ...data });
  }
}
