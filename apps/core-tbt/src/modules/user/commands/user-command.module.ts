import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { UserCommandService } from './user-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [UserCommandService],
  exports: [UserCommandService],
})
export class UserCommandModule {}
