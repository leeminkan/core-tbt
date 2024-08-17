import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { UserService } from './user.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}
