import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { ProductCommandModule } from './commands/product-command.module';
import { ProductPopulateModule } from './product-populate.module';
import { ProductController } from './product.controller';
import { ProductQueryModule } from './queries/product-query.module';

@Module({
  imports: [
    CoreDataTypeormModule.forFeature(),
    ProductCommandModule,
    ProductQueryModule,
    ProductPopulateModule,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
