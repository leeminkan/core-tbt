import { Module } from '@nestjs/common';

import { ProductCommandModule } from './commands/product-command.module';
import { ProductPopulateModule } from './product-populate.module';
import { ProductController } from './product.controller';
import { ProductQueryModule } from './queries/product-query.module';

@Module({
  imports: [ProductCommandModule, ProductQueryModule, ProductPopulateModule],
  controllers: [ProductController],
})
export class ProductModule {}
