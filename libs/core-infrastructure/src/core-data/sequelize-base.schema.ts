import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { CreatedAt, Model, UpdatedAt } from 'sequelize-typescript';

export abstract class SequelizeBaseSchema<
  T extends Model<any, any>,
> extends Model<InferAttributes<T>, InferCreationAttributes<T>> {
  @CreatedAt
  created_at: CreationOptional<Date>;

  @UpdatedAt
  updated_at: CreationOptional<Date>;
}
