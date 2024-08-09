import { registerAs } from '@nestjs/config';
import { IsInt, IsString } from 'class-validator';

import { validateConfig } from '@libs/core-shared';

import { DatabaseConfig } from './database-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  POSTGRES_HOST: string;

  @IsInt()
  POSTGRES_PORT: number;

  @IsString()
  POSTGRES_DB: string;

  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;
}

export const databaseConfig = registerAs<DatabaseConfig>('database', () => {
  const validatedValue = validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );

  return {
    host: validatedValue.POSTGRES_HOST,
    port: validatedValue.POSTGRES_PORT,
    database: validatedValue.POSTGRES_DB,
    username: validatedValue.POSTGRES_USER,
    password: validatedValue.POSTGRES_PASSWORD,
  };
});
