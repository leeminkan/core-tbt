import { Module } from '@nestjs/common';

import { CoreDataSequelizeModule } from '@libs/core-infrastructure';

import { SessionCommandService } from './session-command.service';

@Module({
  imports: [CoreDataSequelizeModule.forFeature()],
  providers: [SessionCommandService],
  exports: [SessionCommandService],
})
export class SessionCommandModule {}
