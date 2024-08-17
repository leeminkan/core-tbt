import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  CoreDataSequelizeModule,
  CoreDataTypeormModule,
} from '@libs/core-infrastructure';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AllConfigType,
  appConfig,
  authConfig,
  databaseConfig,
  keycloakConfig,
} from './configs';
import { AuthModule } from './modules/auth';
import { BookingModule } from './modules/booking';
import { CustomerModule } from './modules/customer';
import { ProductModule } from './modules/product';
import { ProductCategoryModule } from './modules/product-category';
import { UserModule } from './modules/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, keycloakConfig],
    }),
    CoreDataTypeormModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<AllConfigType>) => {
        return {
          typeOrmOptions: {
            type: 'postgres',
            host: config.getOrThrow('database.host', { infer: true }),
            port: config.getOrThrow('database.port', { infer: true }),
            database: config.getOrThrow('database.database', { infer: true }),
            username: config.getOrThrow('database.username', { infer: true }),
            password: config.getOrThrow('database.password', { infer: true }),
            synchronize: false,
            logging: true,
          },
        };
      },
    }),
    CoreDataSequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<AllConfigType>) => {
        return {
          sequelizeOptions: {
            dialect: 'postgres',
            host: config.getOrThrow('database.host', { infer: true }),
            port: config.getOrThrow('database.port', { infer: true }),
            database: config.getOrThrow('database.database', { infer: true }),
            username: config.getOrThrow('database.username', { infer: true }),
            password: config.getOrThrow('database.password', { infer: true }),
            synchronize: false,
            logging: console.log,
            pool: {
              min: 5,
              max: 5,
            },
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    CustomerModule,
    BookingModule,
    ProductModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
