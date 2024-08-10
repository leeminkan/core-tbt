import { Module } from '@nestjs/common';

import { CoreDataTypeormModule } from '@libs/core-infrastructure';

import { BookingController } from './booking.controller';
import { BookingCommandModule } from './commands/booking-command.module';
import { BookingQueryModule } from './queries/booking-query.module';

@Module({
  imports: [
    CoreDataTypeormModule.forFeature(),
    BookingCommandModule,
    BookingQueryModule,
  ],
  controllers: [BookingController],
})
export class BookingModule {}
