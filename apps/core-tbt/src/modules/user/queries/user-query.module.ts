import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { UserQueryService } from './user-query.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [UserQueryService],
  exports: [UserQueryService],
})
export class UserQueryModule {}
