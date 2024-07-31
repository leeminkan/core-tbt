import { Injectable } from '@nestjs/common';
import { JwtService as CoreJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

import { AllConfigType } from '@app/core-tbt/configs';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: CoreJwtService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async getTokensData(data: {
    userId: number;
    sessionId: string;
    hash: string;
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          userId: data.userId,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async verifyAccssToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow('auth.secret', { infer: true }),
    });
  }
}
