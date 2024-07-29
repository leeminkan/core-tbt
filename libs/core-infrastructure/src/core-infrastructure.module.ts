import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User, UserRepository } from './user';
import { Session, SessionRepository } from './session';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'core-tbt',
      username: 'core-tbt',
      password: '123!@#abcABC',
      entities: [User, Session],
      synchronize: false,
      logging: true,
    }),
  ],
  providers: [UserRepository, SessionRepository],
  exports: [UserRepository, SessionRepository],
})
export class CoreInfrastructureModule {}
