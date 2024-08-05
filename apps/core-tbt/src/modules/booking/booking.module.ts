import { Module } from '@nestjs/common';
import { CoreDataModule } from '@libs/core-infrastructure';

import { BookingCommandModule } from './commands/booking-command.module';
import { BookingQueryModule } from './queries/booking-query.module';
import { BookingController } from './booking.controller';

@Module({
  imports: [
    CoreDataModule.forFeature(),
    BookingCommandModule,
    BookingQueryModule,
  ],
  controllers: [BookingController],
})
export class BookingModule {}
