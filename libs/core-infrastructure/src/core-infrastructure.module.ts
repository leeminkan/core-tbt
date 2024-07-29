import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CoreInfrastructureOption,
  CoreInfrastructureAsyncOptions,
  CORE_INFRASTRUCTURE_OPTIONS,
} from './core-infrastructure.types';
import { User, UserRepository } from './user';
import { Session, SessionRepository } from './session';

@Module({})
export class CoreInfrastructureModule {
  static forRoot(options: CoreInfrastructureOption): DynamicModule {
    return {
      module: CoreInfrastructureModule,
      imports: [
        TypeOrmModule.forRoot({
          ...options.typeOrmOptions,
          entities: [User, Session],
        }),
      ],
    };
  }

  static forRootAsync(options: CoreInfrastructureAsyncOptions): DynamicModule {
    return {
      module: CoreInfrastructureModule,
      imports: [
        TypeOrmModule.forRootAsync({
          extraProviders: [
            {
              provide: CORE_INFRASTRUCTURE_OPTIONS,
              useFactory: options.useFactory,
              inject: options.inject ?? [],
            },
          ],
          useFactory: async (options: CoreInfrastructureOption) => {
            return {
              ...options.typeOrmOptions,
              // override options
              entities: [User, Session],
            };
          },
          inject: [CORE_INFRASTRUCTURE_OPTIONS],
        }),
      ],
    };
  }

  static forFeature(): DynamicModule {
    const providers: Provider[] = [UserRepository, SessionRepository];
    return {
      module: CoreInfrastructureModule,
      providers: providers,
      exports: providers,
    };
  }
}
