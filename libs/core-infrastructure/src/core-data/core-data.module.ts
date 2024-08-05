import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  UserRepository,
  SessionRepository,
  CustomerRepository,
  BookingRepository,
} from './persistence';
import {
  User,
  UserRepository as TypeOrmUserRepository,
} from './persistence/user/typeorm';
import {
  Session,
  SessionRepository as TypeOrmSessionRepository,
} from './persistence/session/typeorm';
import {
  Customer,
  CustomerRepository as TypeOrmCustomerRepository,
} from './persistence/customer/typeorm';
import {
  Booking,
  BookingRepository as TypeOrmBookingRepository,
} from './persistence/booking/typeorm';

import {
  CoreDataOption,
  CoreDataAsyncOptions,
  CORE_DATA_OPTIONS,
} from './core-data.types';

@Module({})
export class CoreDataModule {
  static forRoot(options: CoreDataOption): DynamicModule {
    return {
      module: CoreDataModule,
      imports: [
        TypeOrmModule.forRoot({
          ...options.typeOrmOptions,
          entities: [User, Session],
        }),
      ],
    };
  }

  static forRootAsync(options: CoreDataAsyncOptions): DynamicModule {
    return {
      module: CoreDataModule,
      imports: [
        TypeOrmModule.forRootAsync({
          extraProviders: [
            {
              provide: CORE_DATA_OPTIONS,
              useFactory: options.useFactory,
              inject: options.inject ?? [],
            },
          ],
          useFactory: async (options: CoreDataOption) => {
            return {
              ...options.typeOrmOptions,
              // override options
              entities: [User, Session, Customer, Booking],
            };
          },
          inject: [CORE_DATA_OPTIONS],
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
    ];
    return {
      module: CoreDataModule,
      providers: providers,
      exports: providers,
    };
  }
}
