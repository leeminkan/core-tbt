import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CoreDataModule } from '@libs/core-infrastructure';

import { JwtModule } from '@app/core-tbt/modules/jwt';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthCommandModule } from './commands';

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
