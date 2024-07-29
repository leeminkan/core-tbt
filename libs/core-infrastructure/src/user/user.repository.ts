import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User as UserSchema } from './user.schema';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository extends Repository<UserSchema> {
  constructor(private dataSource: DataSource) {
    super(UserSchema, dataSource.createEntityManager());
  }

  async createUser(data: DeepPartial<UserSchema>) {
    const prepareUser = this.create(data);
    const user = await this.save(prepareUser);
    return UserMapper.mapToDomain(user);
  }

  async findAllAndCountUser({ take = 20 }: { take?: number }) {
    const [users, totalCount] = await this.findAndCount({
      take,
    });

    return {
      users: users.map((user) => UserMapper.mapToDomain(user)),
      totalCount,
    };
  }

  async findUserById(id: number) {
    const user = await this.findOneBy({ id });
    return user ? UserMapper.mapToDomain(user) : null;
  }

  async findUserByUsername(username: string) {
    const user = await this.findOneBy({ username });
    return user ? UserMapper.mapToDomain(user) : null;
  }

  async updateUserById(id: number, data: DeepPartial<UserSchema>) {
    return await this.update(id, { ...data });
  }

  async findAndUpdateUserById(id: number, data: DeepPartial<UserSchema>) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.updateUserById(id, data);
  }
}
