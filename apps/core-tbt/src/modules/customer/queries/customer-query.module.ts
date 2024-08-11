import { Module } from '@nestjs/common';

import { CoreDataSequelizeModule } from '@libs/core-infrastructure';

import { CustomerQueryService } from './customer-query.service';

@Module({
  imports: [CoreDataSequelizeModule.forFeature()],
  providers: [CustomerQueryService],
  exports: [CustomerQueryService],
})
export class CustomerQueryModule {}
