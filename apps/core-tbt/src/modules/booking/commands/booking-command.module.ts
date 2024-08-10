import { Module } from '@nestjs/common';

import { CoreDataTypeormModule, UowModule } from '@libs/core-infrastructure';

import { BookingCommandService } from './booking-command.service';

@Module({
  imports: [CoreDataTypeormModule.forFeature(), UowModule],
  providers: [BookingCommandService],
  exports: [BookingCommandService],
})
export class BookingCommandModule {}
