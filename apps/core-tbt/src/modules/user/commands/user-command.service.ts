import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/core-infrastructure';
import { User } from '@app/core-domain';
import { hashSync } from 'bcryptjs';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserCommandService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = hashSync(createUserDto.password, 10);
    const user = await this.userRepository.createUser({
      ...createUserDto,
      password: hashPassword,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.findAndUpdateUserById(id, updateUserDto);
    return await this.userRepository.findUserById(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.deleteUserById(id);
  }
}
