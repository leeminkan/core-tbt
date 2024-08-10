import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { ProductPopulateService } from './product-populate.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [ProductPopulateService],
  exports: [ProductPopulateService],
})
export class ProductPopulateModule {}
