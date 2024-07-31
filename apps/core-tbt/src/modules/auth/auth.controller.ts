import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthCommandService } from './commands/auth-command.service';

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
  async refresh(@Request() request) {
    return await this.authCommandService.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }
}
