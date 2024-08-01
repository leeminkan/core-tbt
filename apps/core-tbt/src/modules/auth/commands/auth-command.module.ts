import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { AuthCommandService } from './auth-command.service';
import { JwtModule } from '@app/core-tbt/modules/jwt';

@Module({
  imports: [CoreInfrastructureModule.forFeature(), JwtModule],
  providers: [AuthCommandService],
  exports: [AuthCommandService],
})
export class AuthCommandModule {}
