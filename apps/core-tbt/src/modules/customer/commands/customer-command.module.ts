import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { CustomerCommandService } from './customer-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [CustomerCommandService],
  exports: [CustomerCommandService],
})
export class CustomerCommandModule {}
