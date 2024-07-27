import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatTbtService {
  getHello(): string {
    return 'Hello World! chat-tbt';
  }
}
