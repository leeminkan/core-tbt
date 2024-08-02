import { Module } from '@nestjs/common';
import { CoreInfrastructureModule, UowModule } from '@app/core-infrastructure';

import { BookingCommandService } from './booking-command.service';

@Module({
  imports: [CoreInfrastructureModule.forFeature(), UowModule],
  providers: [BookingCommandService],
  exports: [BookingCommandService],
})
export class BookingCommandModule {}
