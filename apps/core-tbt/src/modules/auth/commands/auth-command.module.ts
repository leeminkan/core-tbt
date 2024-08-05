import { Module } from '@nestjs/common';
import { CoreDataModule } from '@libs/core-infrastructure';

import { AuthCommandService } from './auth-command.service';
import { JwtModule } from '@app/core-tbt/modules/jwt';

@Module({
  imports: [CoreDataModule.forFeature(), JwtModule],
  providers: [AuthCommandService],
  exports: [AuthCommandService],
})
export class AuthCommandModule {}
