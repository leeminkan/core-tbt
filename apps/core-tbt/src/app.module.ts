import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreDataModule } from '@libs/core-infrastructure';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  appConfig,
  databaseConfig,
  authConfig,
  AllConfigType,
} from './configs';

import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';
import { CustomerModule } from './modules/customer';
import { BookingModule } from './modules/booking';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),
    CoreDataModule.forRootAsync({
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
    UserModule,
    AuthModule,
    CustomerModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
