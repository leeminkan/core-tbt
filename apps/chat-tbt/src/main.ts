import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { ChatTbtModule } from './chat-tbt.module';
import { RedisIoAdapter } from './redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(ChatTbtModule);
  const configService = app.get(ConfigService);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
    password: configService.get('REDIS_PASSWORD'),
  });

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
