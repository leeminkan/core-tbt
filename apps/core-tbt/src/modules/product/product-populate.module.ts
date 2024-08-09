import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { ProductPopulateService } from './product-populate.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [ProductPopulateService],
  exports: [ProductPopulateService],
})
export class ProductPopulateModule {}
