import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import pg from 'pg';

import {
  CoreDataSequelizeAsyncOptions,
  CoreDataSequelizeOption,
} from './core-data-sequelize.types';
import { UserRepository } from './persistence';
import {
  UserRepository as PostgresUserRepository,
  User,
} from './persistence/user/sequelize';

@Module({})
export class CoreDataSequelizeModule {
  static defaultEntities = [User];

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
      {
        provide: UserRepository,
        useClass: PostgresUserRepository,
      },
    ];
    return {
      module: CoreDataSequelizeModule,
      providers: providers,
      exports: providers,
    };
  }
}
