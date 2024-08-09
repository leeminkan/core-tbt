import { Test, TestingModule } from '@nestjs/testing';

import { ChatTbtController } from './chat-tbt.controller';
import { ChatTbtService } from './chat-tbt.service';

describe('ChatTbtController', () => {
  let chatTbtController: ChatTbtController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatTbtController],
      providers: [ChatTbtService],
    }).compile();

    chatTbtController = app.get<ChatTbtController>(ChatTbtController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatTbtController.getHello()).toBe('Hello World!');
    });
  });
});
