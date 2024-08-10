import { CreationOptional, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

import { SequelizeBaseSchema } from '@libs/core-infrastructure/core-data/sequelize-base.schema';

@Table({
  tableName: 'users',
  freezeTableName: true,
})
export class User extends SequelizeBaseSchema<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id: CreationOptional<number>;

  @Column({
    type: DataTypes.CHAR(32),
  })
  username?: string;

  @Column({
    type: DataTypes.CHAR(256),
  })
  password?: string;
}
