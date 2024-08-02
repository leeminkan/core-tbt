import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';

import validateConfig from '../utils/validate-config';
import { AuthConfig } from './auth-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_REFRESH_SECRET: string;

  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
}

export const authConfig = registerAs<AuthConfig>('auth', () => {
  const validatedValue = validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );

  return {
    secret: validatedValue.AUTH_JWT_SECRET,
    expires: validatedValue.AUTH_JWT_TOKEN_EXPIRES_IN,
    refreshSecret: validatedValue.AUTH_REFRESH_SECRET,
    refreshExpires: validatedValue.AUTH_REFRESH_TOKEN_EXPIRES_IN,
  };
});
