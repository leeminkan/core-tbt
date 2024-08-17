import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CoreKeycloakService } from '@libs/core-keycloak';

import { AuthCommandService } from './commands/auth-command.service';
import { SignInDto } from './dtos/sign-in.dto';
import { UserRequest } from './user-request.types';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private authCommandService: AuthCommandService,
    private keycloakService: CoreKeycloakService,
  ) {}

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

  @Get('keycloak-sso')
  @HttpCode(HttpStatus.OK)
  async keycloakLoginUrl(
    @Res({
      passthrough: true,
    })
    res: any, // TODO: update correct type
  ) {
    const url = this.keycloakService.getLoginUrl(
      'http://localhost:3000/api/v1/auth/keycloak-callback',
    );

    return res.redirect(url);
  }

  @Get('keycloak-callback')
  @HttpCode(HttpStatus.OK)
  async keycloakCallback(@Query('code') code: string) {
    return await this.authCommandService.signInSso({
      code,
      redirectUrl: 'http://localhost:3000/api/v1/auth/keycloak-callback',
    });
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(
    @Request() request: UserRequest,
    // @Res({
    //   passthrough: true,
    // })
    // res: any, // TODO: update correct type
  ) {
    const { authProvider, logoutUrl } = await this.authCommandService.signOut({
      sessionId: request.user.sessionId,
    });

    if (authProvider === 'keycloak') {
      // return res.redirect(logoutUrl);
      return {
        authProvider,
        logoutUrl,
      };
    }

    return {
      authProvider,
    };
  }
}
