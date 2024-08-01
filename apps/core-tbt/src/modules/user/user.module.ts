import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { SessionCommandModule } from '@app/core-tbt/modules/session';
import { UserCommandModule } from './commands/user-command.module';
import { UserQueryModule } from './queries/user-query.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    CoreInfrastructureModule.forFeature(),
    UserCommandModule,
    UserQueryModule,
    SessionCommandModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
