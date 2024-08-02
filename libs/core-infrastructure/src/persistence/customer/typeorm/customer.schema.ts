import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseSchema } from '@app/core-infrastructure/base.schema';

@Entity({
  name: 'customers',
})
export class Customer extends BaseSchema {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  first_name: string;

  @Column({ type: 'varchar', length: 64 })
  last_name: string;
}
