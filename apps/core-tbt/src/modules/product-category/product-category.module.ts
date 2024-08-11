import { Module } from '@nestjs/common';

import { ProductCategoryCommandModule } from './commands/product-category-command.module';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryQueryModule } from './queries/product-category-query.module';

@Module({
  imports: [ProductCategoryCommandModule, ProductCategoryQueryModule],
  controllers: [ProductCategoryController],
})
export class ProductCategoryModule {}
