import { Module } from '@nestjs/common';

import { CustomerCommandModule } from './commands/customer-command.module';
import { CustomerController } from './customer.controller';
import { CustomerQueryModule } from './queries/customer-query.module';

@Module({
  imports: [CustomerCommandModule, CustomerQueryModule],
  controllers: [CustomerController],
})
export class CustomerModule {}
