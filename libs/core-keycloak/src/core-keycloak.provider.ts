import { Provider } from '@nestjs/common';
import KeycloakConnect, { KeycloakConfig } from 'keycloak-connect';

import {
  KEYCLOAK_CONNECT_OPTIONS,
  KEYCLOAK_INSTANCE,
} from './core-keycloak.constant';
import { KeycloakConnectOptions } from './core-keycloak.types';

export const keycloakProvider: Provider = {
  provide: KEYCLOAK_INSTANCE,
  useFactory: (opts: KeycloakConnectOptions) => {
    const keycloakOpts = opts as KeycloakConfig;
    const keycloak = new KeycloakConnect({}, keycloakOpts);
    return keycloak;
  },
  inject: [KEYCLOAK_CONNECT_OPTIONS],
};
