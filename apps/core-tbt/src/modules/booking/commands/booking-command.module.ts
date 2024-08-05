import { Module } from '@nestjs/common';
import { CoreDataModule, UowModule } from '@libs/core-infrastructure';

import { BookingCommandService } from './booking-command.service';

@Module({
  imports: [CoreDataModule.forFeature(), UowModule],
  providers: [BookingCommandService],
  exports: [BookingCommandService],
})
export class BookingCommandModule {}
