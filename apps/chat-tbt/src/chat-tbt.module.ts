import { Module } from '@nestjs/common';
import { ChatTbtController } from './chat-tbt.controller';
import { ChatTbtService } from './chat-tbt.service';

@Module({
  imports: [],
  controllers: [ChatTbtController],
  providers: [ChatTbtService],
})
export class ChatTbtModule {}
