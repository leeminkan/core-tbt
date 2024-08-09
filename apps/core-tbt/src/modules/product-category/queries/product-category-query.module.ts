import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { ProductCategoryQueryService } from './product-category-query.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [ProductCategoryQueryService],
  exports: [ProductCategoryQueryService],
})
export class ProductCategoryQueryModule {}
