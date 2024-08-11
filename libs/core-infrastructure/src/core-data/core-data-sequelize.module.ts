import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import pg from 'pg';

import {
  BookingRepository,
  CustomerRepository,
  ProductCategoryRepository,
  ProductRepository,
  SessionRepository,
  UserRepository,
} from '@libs/core-domain';

import {
  CoreDataSequelizeAsyncOptions,
  CoreDataSequelizeOption,
} from './core-data-sequelize.types';
import {
  Booking,
  BookingRepository as PostgresBookingRepository,
} from './persistence/booking/sequelize';
import {
  Customer,
  CustomerRepository as PostgresCustomerRepository,
} from './persistence/customer/sequelize';
import {
  ProductCategoryRepository as PostgresProductCategoryRepository,
  ProductCategory,
} from './persistence/product-category/sequelize';
import {
  ProductRepository as PostgresProductRepository,
  Product,
  ProductCategoryAssociation,
} from './persistence/product/sequelize';
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
  static defaultEntities = [
    User,
    Session,
    Customer,
    Booking,
    ProductCategory,
    Product,
    ProductCategoryAssociation,
  ];

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
      {
        provide: CustomerRepository,
        useClass: PostgresCustomerRepository,
      },
      {
        provide: BookingRepository,
        useClass: PostgresBookingRepository,
      },
      {
        provide: ProductCategoryRepository,
        useClass: PostgresProductCategoryRepository,
      },
      {
        provide: ProductRepository,
        useClass: PostgresProductRepository,
      },
    ];

    return {
      module: CoreDataSequelizeModule,
      providers: providers,
      exports: providers,
    };
  }
}
