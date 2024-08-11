import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import pg from 'pg';

import { SessionRepository, UserRepository } from '@libs/core-domain';

import {
  CoreDataSequelizeAsyncOptions,
  CoreDataSequelizeOption,
} from './core-data-sequelize.types';
import {
  SessionRepository as PostgresSessionRepository,
  Session,
} from './persistence/session/sequelize';
import {
  UserRepository as PostgresUserRepository,
  User,
} from './persistence/user/sequelize';
import { UnitOfWork } from './unit-of-work';
import { SequelizeUnitOfWork } from './unit-of-work/sequelize/uow';

@Module({})
export class CoreDataSequelizeModule {
  static defaultEntities = [User, Session];

  static forRoot(options: CoreDataSequelizeOption): DynamicModule {
    return {
      module: CoreDataSequelizeModule,
      imports: [
        SequelizeModule.forRoot({
          ...options.sequelizeOptions,
          // override options
          models: this.defaultEntities,
          dialectModule: pg,
        }),
      ],
    };
  }

  static forRootAsync(options: CoreDataSequelizeAsyncOptions): DynamicModule {
    return {
      module: CoreDataSequelizeModule,
      imports: [
        SequelizeModule.forRootAsync({
          useFactory: async (_options) => {
            const coreDataSequelizeOption = await options.useFactory(_options);
            return {
              ...coreDataSequelizeOption.sequelizeOptions,
              // override options
              models: this.defaultEntities,
              dialectModule: pg,
            };
          },
          inject: options.inject ?? [],
        }),
      ],
    };
  }

  static forFeature(): DynamicModule {
    const providers: Provider[] = [
      // unit of work
      {
        provide: UnitOfWork,
        useClass: SequelizeUnitOfWork,
      },
      // repositories
      {
        provide: UserRepository,
        useClass: PostgresUserRepository,
      },
      {
        provide: SessionRepository,
        useClass: PostgresSessionRepository,
      },
    ];

    return {
      module: CoreDataSequelizeModule,
      providers: providers,
      exports: providers,
    };
  }
}
