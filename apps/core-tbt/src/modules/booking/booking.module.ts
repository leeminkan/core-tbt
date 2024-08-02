import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';

import { BookingCommandModule } from './commands/booking-command.module';
import { BookingQueryModule } from './queries/booking-query.module';
import { BookingController } from './booking.controller';

@Module({
  imports: [
    CoreInfrastructureModule.forFeature(),
    BookingCommandModule,
    BookingQueryModule,
  ],
  controllers: [BookingController],
})
export class BookingModule {}
