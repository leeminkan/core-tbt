import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';

import { validateConfig } from '@libs/core-shared';

import { KeycloakConfig } from './keycloak-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  KEYCLOAK_AUTH_SERVER_URL: string;

  @IsString()
  KEYCLOAK_REALM: string;

  @IsString()
  KEYCLOAK_CLIENT_ID: string;

  @IsString()
  KEYCLOAK_CLIENT_SECRET: string;
}

export const keycloakConfig = registerAs<KeycloakConfig>(
  'keycloak',
  (): KeycloakConfig => {
    const validatedValue = validateConfig<EnvironmentVariablesValidator>(
      process.env,
      EnvironmentVariablesValidator,
    );

    return {
      authServerUrl: validatedValue.KEYCLOAK_AUTH_SERVER_URL,
      realm: validatedValue.KEYCLOAK_REALM,
      clientId: validatedValue.KEYCLOAK_CLIENT_ID,
      secret: validatedValue.KEYCLOAK_CLIENT_SECRET,
    };
  },
);
