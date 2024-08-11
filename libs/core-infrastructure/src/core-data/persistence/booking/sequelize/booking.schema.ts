import { CreationOptional, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

import { SequelizeBaseSchema } from '@libs/core-infrastructure/core-data/sequelize-base.schema';

@Table({
  tableName: 'bookings',
  freezeTableName: true,
})
export class Booking extends SequelizeBaseSchema<Booking> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id: CreationOptional<number>;

  @Column({
    type: DataTypes.INTEGER,
  })
  customer_id: number;

  @Column
  start_time: Date;

  @Column
  end_time: Date;

  @Column
  status: string;

  @Column
  version: number; // This is the optimistic locking column
}
