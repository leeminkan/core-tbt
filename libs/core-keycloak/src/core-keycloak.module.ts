import { DynamicModule, Module, Provider } from '@nestjs/common';

import { KEYCLOAK_CONNECT_OPTIONS } from './core-keycloak.constant';
import { keycloakProvider } from './core-keycloak.provider';
import { CoreKeycloakService } from './core-keycloak.service';
import {
  KeycloakConnectModuleAsyncOptions,
  KeycloakConnectOptionsFactory,
} from './core-keycloak.types';

@Module({})
export class CoreKeycloakModule {
  public static registerAsync(
    opts: KeycloakConnectModuleAsyncOptions,
  ): DynamicModule {
    const optsProvider = this.createAsyncProviders(opts);

    return {
      module: CoreKeycloakModule,
      imports: opts.imports || [],
      providers: optsProvider,
      exports: optsProvider,
    };
  }

  private static createAsyncProviders(
    options: KeycloakConnectModuleAsyncOptions,
  ): Provider[] {
    const reqProviders = [
      this.createAsyncOptionsProvider(options),
      keycloakProvider,
      CoreKeycloakService,
    ];

    const useExistingOrFactory = options.useExisting || options.useFactory;
    if (useExistingOrFactory) {
      return reqProviders;
    } else if (!options.useClass) {
      throw new Error('Option is invalid');
    }

    return [
      ...reqProviders,
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: KeycloakConnectModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: KEYCLOAK_CONNECT_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const useExistingOrClass = options.useExisting || options.useClass;
    if (!useExistingOrClass) {
      throw new Error('Option is invalid');
    }

    return {
      provide: KEYCLOAK_CONNECT_OPTIONS,
      useFactory: async (optionsFactory: KeycloakConnectOptionsFactory) =>
        await optionsFactory.createKeycloakConnectOptions(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject: [(options.useExisting ?? options.useClass)!],
    };
  }
}
