import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { CustomerQueryService } from './customer-query.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [CustomerQueryService],
  exports: [CustomerQueryService],
})
export class CustomerQueryModule {}
