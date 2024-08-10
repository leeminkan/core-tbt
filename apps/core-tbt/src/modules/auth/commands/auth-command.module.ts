import { Module } from '@nestjs/common';

import { JwtModule } from '@app/core-tbt/modules/jwt';

import { CoreDataModule } from '@libs/core-infrastructure';

import { AuthCommandService } from './auth-command.service';

@Module({
  imports: [CoreDataModule.forFeature(), JwtModule],
  providers: [AuthCommandService],
  exports: [AuthCommandService],
})
export class AuthCommandModule {}
