import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';

import { User, UserRepository } from '@libs/core-domain';

import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = hashSync(createUserDto.password, 10);
    const user = await this.userRepository.createUser({
      ...createUserDto,
      password: hashPassword,
    });
    return user;
  }
}
