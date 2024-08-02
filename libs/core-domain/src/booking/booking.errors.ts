import { BookingStatus } from './booking.constants';

export class BookingUpdateStatusError extends Error {
  constructor(public fromStatus: BookingStatus, public toStatus: string) {
    super(
      `Invalid status! Can not update status from ${fromStatus} to ${toStatus}`,
    );
    this.name = 'BookingUpdateStatusError';
  }
}
