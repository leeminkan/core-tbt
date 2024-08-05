import { Module } from '@nestjs/common';
import { CoreDataModule } from '@libs/core-infrastructure';

import { CustomerQueryService } from './customer-query.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [CustomerQueryService],
  exports: [CustomerQueryService],
})
export class CustomerQueryModule {}
