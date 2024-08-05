import { Module } from '@nestjs/common';
import { CoreDataModule } from '@libs/core-infrastructure';

import { ProductCategoryCommandModule } from './commands/product-category-command.module';
import { ProductCategoryQueryModule } from './queries/product-category-query.module';
import { ProductCategoryController } from './product-category.controller';

@Module({
  imports: [
    CoreDataModule.forFeature(),
    ProductCategoryCommandModule,
    ProductCategoryQueryModule,
  ],
  controllers: [ProductCategoryController],
})
export class ProductCategoryModule {}
