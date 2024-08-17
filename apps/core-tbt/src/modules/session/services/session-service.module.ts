import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { SessionService } from './session.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionServiceModule {}
