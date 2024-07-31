import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { SessionCommandService } from './session-command.service';

@Module({
  imports: [CoreInfrastructureModule.forFeature()],
  providers: [SessionCommandService],
  exports: [SessionCommandService],
})
export class SessionCommandModule {}
