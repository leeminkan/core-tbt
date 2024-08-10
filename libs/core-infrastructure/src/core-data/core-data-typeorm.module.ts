import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CoreDataTypeormAsyncOptions,
  CoreDataTypeormOption,
} from './core-data.types';
import {
  BookingRepository,
  CustomerRepository,
  ProductCategoryRepository,
  ProductRepository,
  SessionRepository,
  UserRepository,
} from './persistence';
import {
  Booking,
  BookingRepository as TypeOrmBookingRepository,
} from './persistence/booking/typeorm';
import {
  Customer,
  CustomerRepository as TypeOrmCustomerRepository,
} from './persistence/customer/typeorm';
import {
  ProductCategory,
  ProductCategoryRepository as TypeOrmProductCategoryRepository,
} from './persistence/product-category/typeorm';
import {
  Product,
  ProductCategoryAssociation,
  ProductRepository as TypeOrmProductRepository,
} from './persistence/product/typeorm';
import {
  Session,
  SessionRepository as TypeOrmSessionRepository,
} from './persistence/session/typeorm';
import {
  UserRepository as TypeOrmUserRepository,
  User,
} from './persistence/user/typeorm';

@Module({})
export class CoreDataTypeormModule {
  static defaultEntities = [
    User,
    Session,
    Customer,
    Booking,
    Product,
    ProductCategory,
    ProductCategoryAssociation,
  ];

  static forRoot(options: CoreDataTypeormOption): DynamicModule {
    return {
      module: CoreDataTypeormModule,
      imports: [
        TypeOrmModule.forRoot({
          ...options.typeOrmOptions,
          // override options
          entities: this.defaultEntities,
        }),
      ],
    };
  }

  static forRootAsync(options: CoreDataTypeormAsyncOptions): DynamicModule {
    return {
      module: CoreDataTypeormModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (_options) => {
            const coreDataTypeormOption = await options.useFactory(_options);
            return {
              ...coreDataTypeormOption.typeOrmOptions,
              // override options
              entities: this.defaultEntities,
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
        useClass: TypeOrmUserRepository,
      },
      {
        provide: SessionRepository,
        useClass: TypeOrmSessionRepository,
      },
      {
        provide: CustomerRepository,
        useClass: TypeOrmCustomerRepository,
      },
      {
        provide: BookingRepository,
        useClass: TypeOrmBookingRepository,
      },
      {
        provide: ProductRepository,
        useClass: TypeOrmProductRepository,
      },
      {
        provide: ProductCategoryRepository,
        useClass: TypeOrmProductCategoryRepository,
      },
    ];
    return {
      module: CoreDataTypeormModule,
      providers: providers,
      exports: providers,
    };
  }
}
