import { CreationOptional, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

import {
  AuthProvider,
  authProviders,
} from '@libs/core-domain/session/session.constant';
import { SessionProperties } from '@libs/core-domain/session/session.type';
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
  is_logout?: CreationOptional<boolean>;

  @Column({
    type: DataTypes.ENUM,
    values: Object.values(authProviders),
    defaultValue: authProviders.internal,
  })
  auth_provider: AuthProvider;

  @Column({
    type: DataTypes.JSONB,
    allowNull: true,
  })
  properties?: SessionProperties;
}
