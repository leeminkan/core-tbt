import { NestFactory } from '@nestjs/core';
import { ChatTbtModule } from './chat-tbt.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatTbtModule);
  await app.listen(3001);
}
bootstrap();
