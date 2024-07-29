import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Session as SessionSchema } from './session.schema';

@Injectable()
export class SessionRepository extends Repository<SessionSchema> {
  constructor(private dataSource: DataSource) {
    super(SessionSchema, dataSource.createEntityManager());
  }
}
