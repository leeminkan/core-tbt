import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { CustomerQueryService } from './customer-query.service';

@Module({
  imports: [CoreInfrastructureModule.forFeature()],
  providers: [CustomerQueryService],
  exports: [CustomerQueryService],
})
export class CustomerQueryModule {}
