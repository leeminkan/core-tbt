import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ChatTbtModule } from './chat-tbt.module';
import { AllConfigType } from './configs';
import { RedisIoAdapter } from './redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(ChatTbtModule);
  const configService = app.get(ConfigService<AllConfigType>);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis({
    host: configService.getOrThrow('redis.host', {
      infer: true,
    }),
    port: configService.getOrThrow('redis.port', {
      infer: true,
    }),
    password: configService.getOrThrow('redis.password', {
      infer: true,
    }),
  });

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(
    configService.getOrThrow('app.port', {
      infer: true,
    }),
  );
}
bootstrap();
