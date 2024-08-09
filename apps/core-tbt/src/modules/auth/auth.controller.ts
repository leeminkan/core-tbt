import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthCommandService } from './commands/auth-command.service';
import { SignInDto } from './dtos/sign-in.dto';
import { UserRequest } from './user-request.types';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authCommandService: AuthCommandService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authCommandService.signIn({
      username: signInDto.username,
      password: signInDto.password,
    });
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  async refresh(@Request() request: UserRequest) {
    return await this.authCommandService.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }
}
