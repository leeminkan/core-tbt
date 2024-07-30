import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@app/core-infrastructure';
import { User } from '@app/core-domain';
import { hashSync } from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.findAndUpdateUserById(id, updateUserDto);
    return await this.userRepository.findUserById(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.deleteUserById(id);
  }
}
