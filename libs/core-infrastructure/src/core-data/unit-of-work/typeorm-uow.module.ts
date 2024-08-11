import { Module } from '@nestjs/common';

import { TypeormUnitOfWork } from './typeorm/uow';

export const TYPEORM_UNIT_OF_WORK = Symbol('UNIT_OF_WORK');

@Module({
  providers: [
    {
      provide: TYPEORM_UNIT_OF_WORK,
      useClass: TypeormUnitOfWork,
    },
  ],
  exports: [TYPEORM_UNIT_OF_WORK],
})
export class TypeormUowModule {}
