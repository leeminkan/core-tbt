import { BadRequestException, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';

import { User } from '@app/core-domain';
import { UserRepository } from '@app/core-infrastructure';
import { Nullable } from '@app/core-shared';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserCommandService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // check username
    const existedUser = await this.userRepository.findUserByUsername(
      createUserDto.username,
    );
    if (existedUser) {
      throw new BadRequestException(
        `Username ${createUserDto.username} has already existed!`,
      );
    }

    const hashPassword = hashSync(createUserDto.password, 10);
    const user = await this.userRepository.createUser({
      ...createUserDto,
      password: hashPassword,
    });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Nullable<User>> {
    // check username
    const existedUser = await this.userRepository.findUserByUsername(
      updateUserDto.username,
    );
    if (existedUser && existedUser.id !== id) {
      throw new BadRequestException(
        `Username ${updateUserDto.username} has already existed!`,
      );
    }

    const hashPassword = updateUserDto?.password
      ? hashSync(updateUserDto.password, 10)
      : undefined;

    await this.userRepository.findAndUpdateUserById(id, {
      ...updateUserDto,
      password: hashPassword,
    });

    return await this.userRepository.findById(id, {
      throwNotFoundError: true,
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.deleteUserById(id);
  }
}
