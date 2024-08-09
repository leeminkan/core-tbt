import { Controller, Get } from '@nestjs/common';

import { ChatTbtService } from './chat-tbt.service';

@Controller()
export class ChatTbtController {
  constructor(private readonly chatTbtService: ChatTbtService) {}

  @Get()
  getHello(): string {
    return this.chatTbtService.getHello();
  }
}
