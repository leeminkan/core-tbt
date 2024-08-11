import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { BookingCommandService } from './booking-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature()],
  providers: [BookingCommandService],
  exports: [BookingCommandService],
})
export class BookingCommandModule {}
