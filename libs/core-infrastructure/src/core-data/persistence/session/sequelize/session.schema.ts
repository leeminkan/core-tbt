import { CreationOptional, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

import { SequelizeBaseSchema } from '@libs/core-infrastructure/core-data/sequelize-base.schema';

@Table({
  tableName: 'sessions',
  freezeTableName: true,
})
export class Session extends SequelizeBaseSchema<Session> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUIDV4,
  })
  id: CreationOptional<string>;

  @Column({
    type: DataTypes.INTEGER,
  })
  user_id: number;

  @Column({
    type: DataTypes.CHAR(32),
  })
  hash?: string;

  @Column({
    type: DataTypes.BOOLEAN,
  })
  is_logout?: boolean;
}
