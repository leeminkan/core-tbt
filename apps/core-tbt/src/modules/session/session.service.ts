import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@app/core-infrastructure';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async findAllAndCountByUserId(userId: number) {
    return await this.sessionRepository.findAllAndCountByUserId(userId, {
      take: 20,
    });
  }
}
