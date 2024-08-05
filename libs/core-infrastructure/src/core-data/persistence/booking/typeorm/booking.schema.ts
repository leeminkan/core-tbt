import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

import { TypeormBaseSchema } from '@libs/core-infrastructure/core-data/typeorm-base.schema';

@Entity({
  name: 'bookings',
})
export class Booking extends TypeormBaseSchema {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column()
  status: string;

  @VersionColumn()
  version: number; // This is the optimistic locking column
}
