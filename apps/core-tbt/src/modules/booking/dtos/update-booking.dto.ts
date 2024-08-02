import { IsDate } from 'class-validator';

export class UpdateBookingDto {
  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}
