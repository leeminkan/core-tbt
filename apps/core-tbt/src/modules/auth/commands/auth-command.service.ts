import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { UserRepository, SessionRepository } from '@app/core-infrastructure';
import { createHash } from 'node:crypto';
import { compareSync } from 'bcryptjs';

import { TokenService } from '@app/core-tbt/modules/jwt';

@Injectable()
export class AuthCommandService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<any> {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = compareSync(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const hash = createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionRepository.createSession({
      user_id: user.id,
      hash,
    });

    return await this.tokenService.getTokensData({
      userId: user.id,
      sessionId: session.id,
      hash,
    });
  }

  async refreshToken(data: { sessionId: string; hash: string }) {
    const session = await this.sessionRepository.findSessionById(
      data.sessionId,
    );

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException();
    }

    const hash = createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.userRepository.findUserById(session.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.sessionRepository.updateSessionById(session.id, {
      hash,
    });

    const { token, refreshToken, tokenExpires } =
      await this.tokenService.getTokensData({
        userId: session.userId,
        sessionId: session.id,
        hash,
      });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
