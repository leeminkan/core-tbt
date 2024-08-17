import { Module } from '@nestjs/common';

import { KeycloakModule } from '@app/core-tbt/keycloak.module';
import { JwtModule } from '@app/core-tbt/modules/jwt';
import { SessionServiceModule } from '@app/core-tbt/modules/session/services/session-service.module';
import { UserServiceModule } from '@app/core-tbt/modules/user/services/user-service.module';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { AuthCommandService } from './auth-command.service';

@Module({
  imports: [
    CoreDataTypeormModule.forFeature(),
    JwtModule,
    KeycloakModule,
    UserServiceModule,
    SessionServiceModule,
  ],
  providers: [AuthCommandService],
  exports: [AuthCommandService],
})
export class AuthCommandModule {}
