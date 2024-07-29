import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [CoreInfrastructureModule.forFeature(), SessionModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
