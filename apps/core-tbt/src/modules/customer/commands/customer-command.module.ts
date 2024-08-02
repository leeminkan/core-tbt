import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { CustomerCommandService } from './customer-command.service';

@Module({
  imports: [CoreInfrastructureModule.forFeature()],
  providers: [CustomerCommandService],
  exports: [CustomerCommandService],
})
export class CustomerCommandModule {}
