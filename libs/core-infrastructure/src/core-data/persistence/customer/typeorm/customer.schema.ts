import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TypeormBaseSchema } from '@libs/core-infrastructure/core-data/typeorm-base.schema';

@Entity({
  name: 'customers',
})
export class Customer extends TypeormBaseSchema {
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
