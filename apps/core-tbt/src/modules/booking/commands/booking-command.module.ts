import { Module } from '@nestjs/common';

import { CoreDataSequelizeModule } from '@libs/core-infrastructure';

import { BookingCommandService } from './booking-command.service';

@Module({
  imports: [CoreDataSequelizeModule.forFeature()],
  providers: [BookingCommandService],
  exports: [BookingCommandService],
})
export class BookingCommandModule {}
