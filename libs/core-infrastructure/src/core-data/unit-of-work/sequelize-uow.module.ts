import { Module } from '@nestjs/common';

import { SequelizeUnitOfWork } from './sequelize/uow';

export const SEQUELIZE_UNIT_OF_WORK = Symbol('UNIT_OF_WORK');

@Module({
  providers: [
    {
      provide: SEQUELIZE_UNIT_OF_WORK,
      useClass: SequelizeUnitOfWork,
    },
  ],
  exports: [SEQUELIZE_UNIT_OF_WORK],
})
export class SequelizeUowModule {}
