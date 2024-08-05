import { Module } from '@nestjs/common';
import { CoreDataModule } from '@libs/core-infrastructure';

import { ProductCategoryCommandService } from './product-category-command.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [ProductCategoryCommandService],
  exports: [ProductCategoryCommandService],
})
export class ProductCategoryCommandModule {}
