import { Module } from '@nestjs/common';

import { CoreDataSequelizeModule } from '@libs/core-infrastructure';

import { UserQueryService } from './user-query.service';

@Module({
  imports: [CoreDataSequelizeModule.forFeature()],
  providers: [UserQueryService],
  exports: [UserQueryService],
})
export class UserQueryModule {}
