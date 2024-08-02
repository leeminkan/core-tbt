import { AppConfig } from './app-config.type';
import { RedisConfig } from './redis-config.type';

export type AllConfigType = {
  app: AppConfig;
  redis: RedisConfig;
};
