import { BaseDomainError } from '../base.errors';
import { BookingStatus } from './booking.constants';

export class BookingUpdateStatusError extends BaseDomainError {
  constructor(public fromStatus: BookingStatus, public toStatus: string) {
    super(
      `Invalid status! Can not update status from ${fromStatus} to ${toStatus}`,
    );
    this.name = 'BookingUpdateStatusError';
    this.status = 422;
    this.errorCode = 'BookingUpdateStatusError';
  }
}
