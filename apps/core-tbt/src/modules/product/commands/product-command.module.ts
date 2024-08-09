import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { ProductCommandService } from './product-command.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [ProductCommandService],
  exports: [ProductCommandService],
})
export class ProductCommandModule {}
