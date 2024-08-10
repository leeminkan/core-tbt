import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { SessionCommandService } from './session-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [SessionCommandService],
  exports: [SessionCommandService],
})
export class SessionCommandModule {}
