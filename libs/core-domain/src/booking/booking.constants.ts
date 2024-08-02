export const bookingStatus = {
  CREATED: 'CREATED',
  CHECK_IN: 'CHECK_IN',
  CHECK_OUT: 'CHECK_OUT',
  CANCELLED: 'CANCELLED',
} as const;

export type BookingStatus = (typeof bookingStatus)[keyof typeof bookingStatus];
