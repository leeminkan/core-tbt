import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { KeycloakModule } from '@app/core-tbt/keycloak.module';
import { JwtModule } from '@app/core-tbt/modules/jwt';

import { AuthController } from './auth.controller';
import { AuthCommandModule } from './commands';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule, PassportModule, AuthCommandModule, KeycloakModule],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
