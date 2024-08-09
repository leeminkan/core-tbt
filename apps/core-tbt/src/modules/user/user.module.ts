import { SessionCommandModule } from '@app/core-tbt/modules/session';
import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { UserCommandModule } from './commands/user-command.module';
import { UserQueryModule } from './queries/user-query.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    CoreDataModule.forFeature(),
    UserCommandModule,
    UserQueryModule,
    SessionCommandModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
