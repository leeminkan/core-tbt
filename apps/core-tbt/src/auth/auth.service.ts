import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@app/core-infrastructure';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<any> {
    const user = await this.userRepository.findUserByUsername(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
