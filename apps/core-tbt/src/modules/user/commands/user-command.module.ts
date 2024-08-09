import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { UserCommandService } from './user-command.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [UserCommandService],
  exports: [UserCommandService],
})
export class UserCommandModule {}
