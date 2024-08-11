import { CreationOptional, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

import { SequelizeBaseSchema } from '@libs/core-infrastructure/core-data/sequelize-base.schema';

@Table({
  tableName: 'customers',
  freezeTableName: true,
})
export class Customer extends SequelizeBaseSchema<Customer> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id: CreationOptional<number>;

  @Column({
    type: DataTypes.CHAR(64),
  })
  first_name?: string;

  @Column({
    type: DataTypes.CHAR(64),
  })
  last_name?: string;
}
