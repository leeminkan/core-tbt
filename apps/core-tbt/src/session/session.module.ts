import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { SessionService } from './session.service';

@Module({
  imports: [CoreInfrastructureModule.forFeature()],
  controllers: [],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
