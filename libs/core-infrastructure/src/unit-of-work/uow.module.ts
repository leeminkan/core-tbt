import { Module } from '@nestjs/common';
import { UnitOfWork } from './uow.abstract';
import { TypeOrmUnitOfWork } from './typeorm/uow';

@Module({
  providers: [
    {
      provide: UnitOfWork,
      useClass: TypeOrmUnitOfWork,
    },
  ],
  exports: [UnitOfWork],
})
export class UowModule {}
