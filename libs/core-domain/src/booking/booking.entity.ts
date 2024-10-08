import { BaseEntity } from '../base.entity';
import { BookingStatus, bookingStatus } from './booking.constants';
import { BookingUpdateStatusError } from './booking.errors';

export class Booking extends BaseEntity {
  id: number;
  customerId: number;

  startTime: Date;
  endTime: Date;

  status: BookingStatus;
  version: number;

  cancel() {
    // if (this.status !== bookingStatus.CREATED)
    //   throw new BookingUpdateStatusError(this.status, bookingStatus.CANCELLED);
    this.status = bookingStatus.CANCELLED;
  }

  checkIn() {
    if (this.status !== bookingStatus.CREATED)
      throw new BookingUpdateStatusError(this.status, bookingStatus.CHECK_IN);
    this.status = bookingStatus.CHECK_IN;
  }

  checkOut() {
    if (this.status !== bookingStatus.CHECK_IN)
      throw new BookingUpdateStatusError(this.status, bookingStatus.CHECK_OUT);
    this.status = bookingStatus.CHECK_OUT;
  }
}
