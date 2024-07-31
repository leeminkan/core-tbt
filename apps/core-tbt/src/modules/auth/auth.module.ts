import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { JwtModule } from '../jwt/jwt.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthCommandModule } from './commands';

@Module({
  imports: [
    CoreInfrastructureModule.forFeature(),
    JwtModule,
    PassportModule,
    AuthCommandModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
