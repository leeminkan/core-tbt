import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { validationOptions } from '@libs/core-shared';

import { AppModule } from './app.module';
import { AllConfigType } from './configs';
import {
  DomainExceptionFilter,
  HttpExceptionFilter,
  InfrastructureErrorExceptionFilter,
} from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false, // Disable if not needed
    }),
  );
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe(validationOptions)); // set validations to the application level
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // apply transform to all responses
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalFilters(new InfrastructureErrorExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
