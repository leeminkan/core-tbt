import { CreationOptional, DataTypes, NonAttribute } from 'sequelize';
import { Column, HasMany, HasOne, Table } from 'sequelize-typescript';

import { SequelizeBaseSchema } from '@libs/core-infrastructure/core-data/sequelize-base.schema';

@Table({
  tableName: 'product_categories',
  freezeTableName: true,
})
export class ProductCategory extends SequelizeBaseSchema<ProductCategory> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id: CreationOptional<number>;

  @Column({
    type: DataTypes.CHAR(64),
  })
  name: string;

  @Column({
    type: DataTypes.TEXT(),
  })
  description: string;

  @Column
  parent_id: number;

  @HasOne(() => ProductCategory, {
    sourceKey: 'parent_id',
    foreignKey: 'id',
  })
  parent?: NonAttribute<ProductCategory>;

  @HasMany(() => ProductCategory, {
    sourceKey: 'id',
    foreignKey: 'parent_id',
  })
  children?: NonAttribute<ProductCategory[]>;
}
