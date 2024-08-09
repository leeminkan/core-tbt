import { Module } from '@nestjs/common';

import { CoreDataModule } from '@libs/core-infrastructure';

import { BookingQueryService } from './booking-query.service';

@Module({
  imports: [CoreDataModule.forFeature()],
  providers: [BookingQueryService],
  exports: [BookingQueryService],
})
export class BookingQueryModule {}
