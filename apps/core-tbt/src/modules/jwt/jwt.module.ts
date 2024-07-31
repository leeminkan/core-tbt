import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as CoreJwtModule } from '@nestjs/jwt';

import { AllConfigType } from '@app/core-tbt/configs';

import { TokenService } from './token.service';

@Module({
  imports: [
    CoreJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        global: true,
        secret: configService.get('auth.secret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('auth.expires', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TokenService],
  exports: [CoreJwtModule, TokenService],
})
export class JwtModule {}
