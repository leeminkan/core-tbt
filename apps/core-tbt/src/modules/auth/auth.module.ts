import { JwtModule } from '@app/core-tbt/modules/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CoreDataModule } from '@libs/core-infrastructure';

import { AuthController } from './auth.controller';
import { AuthCommandModule } from './commands';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    CoreDataModule.forFeature(),
    JwtModule,
    PassportModule,
    AuthCommandModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
