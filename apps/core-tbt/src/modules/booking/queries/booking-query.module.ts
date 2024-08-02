import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { BookingQueryService } from './booking-query.service';

@Module({
  imports: [CoreInfrastructureModule.forFeature()],
  providers: [BookingQueryService],
  exports: [BookingQueryService],
})
export class BookingQueryModule {}
