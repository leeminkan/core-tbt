import { Module } from '@nestjs/common';

import { CoreDataSequelizeModule } from '@libs/core-infrastructure';

import { ProductQueryService } from './product-query.service';

@Module({
  imports: [CoreDataSequelizeModule.forFeature()],
  providers: [ProductQueryService],
  exports: [ProductQueryService],
})
export class ProductQueryModule {}
