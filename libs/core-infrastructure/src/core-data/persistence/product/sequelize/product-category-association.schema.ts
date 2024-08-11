import { DataTypes, NonAttribute } from 'sequelize';
import { Column, HasOne, Table } from 'sequelize-typescript';

import { SequelizeBaseSchema } from '@libs/core-infrastructure/core-data/sequelize-base.schema';

import { Product } from './product.schema';

@Table({
  tableName: 'product_category_associations',
  freezeTableName: true,
})
export class ProductCategoryAssociation extends SequelizeBaseSchema<ProductCategoryAssociation> {
  @Column({
    primaryKey: true,
    type: DataTypes.INTEGER,
  })
  product_id: number;

  @Column({
    primaryKey: true,
    type: DataTypes.INTEGER,
  })
  category_id: number;

  @HasOne(() => Product, {
    sourceKey: 'product_id',
    foreignKey: 'id',
  })
  product?: NonAttribute<Product>;
}
