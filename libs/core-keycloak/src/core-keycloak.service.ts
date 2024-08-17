import { Inject, Injectable } from '@nestjs/common';
import KeycloakConnect from 'keycloak-connect';

import {
  ObtainFromCodeResponse,
  UserProfileResponse,
} from './core-keycloak-response.types';
import { KEYCLOAK_INSTANCE } from './core-keycloak.constant';

@Injectable()
export class CoreKeycloakService {
  constructor(
    @Inject(KEYCLOAK_INSTANCE)
    private keycloakInstance: KeycloakConnect.Keycloak,
  ) {}

  getLoginUrl(redirectUrl: string) {
    const sessionId = 'session-id' + Math.floor(Math.random() * 100_000);
    return this.keycloakInstance.loginUrl(sessionId, redirectUrl);
  }

  getLogoutUrl(redirectUrl: string, idToken: string) {
    return this.keycloakInstance.logoutUrl(redirectUrl, idToken);
  }

  async obtainFromCode(code: string, redirectUrl: string) {
    const token = (await this.keycloakInstance.grantManager.obtainFromCode(
      {
        session: {
          auth_redirect_uri: redirectUrl,
        },
      } as any,
      code,
    )) as unknown as ObtainFromCodeResponse;

    return token;
  }

  async getUserInfo(token: string) {
    return (await this.keycloakInstance.grantManager.userInfo(
      token,
    )) as UserProfileResponse;
  }
}
