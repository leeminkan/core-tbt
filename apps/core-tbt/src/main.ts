import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // set validations to the application level
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // apply transform to all responses

  await app.listen(3000);
}
bootstrap();
