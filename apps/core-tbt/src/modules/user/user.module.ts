import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { UserCommandModule } from './commands/user-command.module';
import { UserQueryModule } from './queries/user-query.module';
import { UserController } from './user.controller';
import { SessionCommandModule } from '../session/commands';

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
