import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { ProductCategoryCommandService } from './product-category-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [ProductCategoryCommandService],
  exports: [ProductCategoryCommandService],
})
export class ProductCategoryCommandModule {}
