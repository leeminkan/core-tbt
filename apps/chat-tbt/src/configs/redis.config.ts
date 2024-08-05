import { registerAs } from '@nestjs/config';
import { IsInt, IsString } from 'class-validator';

import { validateConfig } from '@libs/core-shared';

import { RedisConfig } from './redis-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  REDIS_HOST: string;

  @IsInt()
  REDIS_PORT: number;

  @IsString()
  REDIS_PASSWORD: string;
}

export const redisConfig = registerAs<RedisConfig>('redis', () => {
  const validatedValue = validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );

  return {
    host: validatedValue.REDIS_HOST,
    port: validatedValue.REDIS_PORT,
    password: validatedValue.REDIS_PASSWORD,
  };
});
