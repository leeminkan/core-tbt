import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ChatTbtController } from './chat-tbt.controller';
import { ChatTbtService } from './chat-tbt.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [ChatTbtController],
  providers: [ChatTbtService, ChatGateway],
})
export class ChatTbtModule {}
