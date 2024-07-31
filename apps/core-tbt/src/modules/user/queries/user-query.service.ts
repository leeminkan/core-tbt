import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@app/core-infrastructure';
import { User } from '@app/core-domain';

@Injectable()
export class UserQueryService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllAndCount(): Promise<{
    data: User[];
    totalCount: number;
  }> {
    return await this.userRepository.findAllAndCountUser({ take: 20 });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
