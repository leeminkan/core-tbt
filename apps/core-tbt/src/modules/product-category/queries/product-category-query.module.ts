import { Module } from '@nestjs/common';

import { CoreDataSequelizeModule } from '@libs/core-infrastructure';

import { ProductCategoryQueryService } from './product-category-query.service';

@Module({
  imports: [CoreDataSequelizeModule.forFeature()],
  providers: [ProductCategoryQueryService],
  exports: [ProductCategoryQueryService],
})
export class ProductCategoryQueryModule {}
