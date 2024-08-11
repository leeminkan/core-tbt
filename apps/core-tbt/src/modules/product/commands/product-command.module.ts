import { Module } from '@nestjs/common';

import { CoreDataSequelizeModule } from '@libs/core-infrastructure';

import { ProductCommandService } from './product-command.service';

@Module({
  imports: [CoreDataSequelizeModule.forFeature()],
  providers: [ProductCommandService],
  exports: [ProductCommandService],
})
export class ProductCommandModule {}
