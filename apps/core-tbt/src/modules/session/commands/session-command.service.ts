import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@libs/core-infrastructure';

@Injectable()
export class SessionCommandService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async findAllAndCountByUserId(userId: number) {
    return await this.sessionRepository.findAllAndCountByUserId(userId, {
      take: 20,
    });
  }
}
