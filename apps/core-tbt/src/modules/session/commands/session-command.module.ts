import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { SessionCommandService } from './session-command.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [SessionCommandService],
  exports: [SessionCommandService],
})
export class SessionCommandModule {}
