import { Module } from '@nestjs/common';

import { BookingController } from './booking.controller';
import { BookingCommandModule } from './commands/booking-command.module';
import { BookingQueryModule } from './queries/booking-query.module';

@Module({
  imports: [BookingCommandModule, BookingQueryModule],
  controllers: [BookingController],
})
export class BookingModule {}
