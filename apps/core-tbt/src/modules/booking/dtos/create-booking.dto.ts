import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  customerId: number;

  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  endTime: Date;
}
