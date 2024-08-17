import { Injectable } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { createHash } from 'crypto';

import { SessionRepository } from '@libs/core-domain';
import { AuthProvider } from '@libs/core-domain/session/session.constant';
import { SessionProperties } from '@libs/core-domain/session/session.type';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create({
    userId,
    authProvider,
    properties,
  }: {
    userId: number;
    authProvider: AuthProvider;
    properties: SessionProperties;
  }) {
    const hash = createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionRepository.createSession({
      userId,
      hash,
      authProvider,
      properties,
    });

    return session;
  }
}
