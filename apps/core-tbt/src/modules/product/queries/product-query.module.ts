import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { ProductQueryService } from './product-query.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [ProductQueryService],
  exports: [ProductQueryService],
})
export class ProductQueryModule {}
