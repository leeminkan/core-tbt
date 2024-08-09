import { Module } from '@nestjs/common';

import { TypeOrmUnitOfWork } from './typeorm/uow';
import { UnitOfWork } from './uow.abstract';

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
