import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { UserQueryService } from './user-query.service';

@Module({
  imports: [CoreInfrastructureModule.forFeature()],
  providers: [UserQueryService],
  exports: [UserQueryService],
})
export class UserQueryModule {}
