import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CoreKeycloakModule } from '@libs/core-keycloak';

import { AllConfigType } from './configs';

@Module({
  imports: [
    CoreKeycloakModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<AllConfigType>) => {
        const keycloakConfig = config.getOrThrow('keycloak', {
          infer: true,
        });
        return keycloakConfig;
      },
    }),
  ],
  exports: [CoreKeycloakModule],
})
export class KeycloakModule {}
