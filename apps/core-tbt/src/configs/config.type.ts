import { AppConfig } from './app-config.type';
import { AuthConfig } from './auth-config.type';
import { DatabaseConfig } from './database-config.type';
import { KeycloakConfig } from './keycloak-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  keycloak: KeycloakConfig;
};
