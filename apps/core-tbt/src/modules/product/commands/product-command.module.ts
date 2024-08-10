import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { ProductCommandService } from './product-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [ProductCommandService],
  exports: [ProductCommandService],
})
export class ProductCommandModule {}
