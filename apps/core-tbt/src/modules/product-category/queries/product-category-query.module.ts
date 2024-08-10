import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { ProductCategoryQueryService } from './product-category-query.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [ProductCategoryQueryService],
  exports: [ProductCategoryQueryService],
})
export class ProductCategoryQueryModule {}
