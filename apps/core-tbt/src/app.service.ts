import { Injectable } from '@nestjs/common';
import { UserRepository, SessionRepository } from '@app/core-infrastructure';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async getHello(): Promise<string> {
    console.log(
      'Test core-infrastructure user',
      await this.userRepository.find(),
    );
    console.log(
      'Test core-infrastructure session',
      await this.sessionRepository.find(),
    );
    return 'Hello World! core-tbt';
  }
}
