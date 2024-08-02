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
  CoreInfrastructureOption,
  CoreInfrastructureAsyncOptions,
  CORE_INFRASTRUCTURE_OPTIONS,
} from './core-infrastructure.types';

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
              entities: [User, Session, Customer, Booking],
            };
          },
          inject: [CORE_INFRASTRUCTURE_OPTIONS],
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
      module: CoreInfrastructureModule,
      providers: providers,
      exports: providers,
    };
  }
}
