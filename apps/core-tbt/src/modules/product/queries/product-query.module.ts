import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { ProductQueryService } from './product-query.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [ProductQueryService],
  exports: [ProductQueryService],
})
export class ProductQueryModule {}
