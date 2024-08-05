import { Module } from '@nestjs/common';
import { CoreDataModule } from '@libs/core-infrastructure';

import { CustomerCommandModule } from './commands/customer-command.module';
import { CustomerQueryModule } from './queries/customer-query.module';
import { CustomerController } from './customer.controller';

@Module({
  imports: [
    CoreDataModule.forFeature(),
    CustomerCommandModule,
    CustomerQueryModule,
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
