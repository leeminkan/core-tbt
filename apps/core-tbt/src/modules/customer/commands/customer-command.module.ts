import { Module } from '@nestjs/common';
import { CoreDataModule } from '@libs/core-infrastructure';

import { CustomerCommandService } from './customer-command.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [CustomerCommandService],
  exports: [CustomerCommandService],
})
export class CustomerCommandModule {}
