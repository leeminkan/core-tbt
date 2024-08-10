import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { CustomerCommandModule } from './commands/customer-command.module';
import { CustomerController } from './customer.controller';
import { CustomerQueryModule } from './queries/customer-query.module';

@Module({
  imports: [
    CoreDataTypeormModule.forFeature(),
    CustomerCommandModule,
    CustomerQueryModule,
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
