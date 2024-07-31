import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { UserCommandService } from './user-command.service';

@Module({
  imports: [CoreInfrastructureModule.forFeature()],
  providers: [UserCommandService],
  exports: [UserCommandService],
})
export class UserCommandModule {}
