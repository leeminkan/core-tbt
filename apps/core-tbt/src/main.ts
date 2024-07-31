import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllConfigType } from './configs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe()); // set validations to the application level
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // apply transform to all responses

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
