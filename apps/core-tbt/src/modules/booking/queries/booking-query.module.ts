import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { BookingQueryService } from './booking-query.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [BookingQueryService],
  exports: [BookingQueryService],
})
export class BookingQueryModule {}
