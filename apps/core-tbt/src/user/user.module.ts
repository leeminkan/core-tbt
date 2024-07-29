import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [CoreInfrastructureModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
