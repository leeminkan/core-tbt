import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { UserServiceModule } from '../services/user-service.module';
import { UserCommandService } from './user-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature(), UserServiceModule],
  providers: [UserCommandService],
  exports: [UserCommandService],
})
export class UserCommandModule {}
