import { AppConfig } from './app-config.type';
import { DatabaseConfig } from './database-config.type';
import { AuthConfig } from './auth-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
};
