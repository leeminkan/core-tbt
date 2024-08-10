import { Module } from '@nestjs/common';

import { JwtModule } from '@app/core-tbt/modules/jwt';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { AuthCommandService } from './auth-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature(), JwtModule],
  providers: [AuthCommandService],
  exports: [AuthCommandService],
})
export class AuthCommandModule {}
