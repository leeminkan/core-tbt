import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { compareSync } from 'bcryptjs';
import { createHash } from 'node:crypto';

import { TokenService } from '@app/core-tbt/modules/jwt';
import { SessionService } from '@app/core-tbt/modules/session/services/session.service';
import { UserService } from '@app/core-tbt/modules/user/services/user.service';

import { SessionRepository, UserRepository } from '@libs/core-domain';
import { KeycloakProperties } from '@libs/core-domain/session/session.type';
import { CoreKeycloakService } from '@libs/core-keycloak';

@Injectable()
export class AuthCommandService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly sessionRepository: SessionRepository,
    private readonly keycloakService: CoreKeycloakService,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
  ) {}

  async signIn({ username, password }: { username: string; password: string }) {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = compareSync(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const session = await this.sessionService.create({
      userId: user.id,
      authProvider: 'internal',
      properties: null,
    });

    return await this.tokenService.getTokensData({
      userId: user.id,
      sessionId: session.id,
      hash: session.hash,
    });
  }

  async signInSso({
    code,
    redirectUrl,
  }: {
    code: string;
    redirectUrl: string;
  }) {
    const tokenResponse = await this.keycloakService
      .obtainFromCode(code, redirectUrl)
      .catch((_) => {
        throw new UnauthorizedException();
      });

    const userInfo = await this.keycloakService
      .getUserInfo(tokenResponse.access_token.token)
      .catch((_) => {
        throw new UnauthorizedException();
      });

    let user = await this.userRepository.findUserByUsername(userInfo.email);

    if (!user) {
      user = await this.userService.create({
        username: userInfo.email,
        password: '',
      });
    }

    const session = await this.sessionService.create({
      userId: user.id,
      authProvider: 'keycloak',
      properties: {
        idToken: tokenResponse.id_token.token,
      },
    });

    return await this.tokenService.getTokensData({
      userId: user.id,
      sessionId: session.id,
      hash: session.hash,
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

    if (session.isLogout) {
      throw new UnauthorizedException();
    }

    const hash = createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.userRepository.findById(session.userId);

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

  async signOut({ sessionId }: { sessionId: string }) {
    const session = await this.sessionRepository.findSessionById(sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    await this.sessionRepository.updateSessionById(sessionId, {
      isLogout: true,
    });

    if (session.authProvider === 'keycloak') {
      const sessionProperties = session.properties as KeycloakProperties;
      const logoutUrl = this.keycloakService.getLogoutUrl(
        'http://localhost:3000/api/v1/auth/keycloak-sso',
        sessionProperties.idToken,
      );

      return {
        authProvider: session.authProvider,
        logoutUrl,
      };
    }

    return {
      authProvider: session.authProvider,
      logoutUrl: '',
    };
  }
}
