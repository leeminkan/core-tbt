import { CreationOptional, DataTypes, NonAttribute } from 'sequelize';
import { Column, HasMany, Table } from 'sequelize-typescript';

import { SequelizeBaseSchema } from '@libs/core-infrastructure/core-data/sequelize-base.schema';

import { ProductCategoryAssociation } from './product-category-association.schema';

@Table({
  tableName: 'products',
  freezeTableName: true,
})
export class Product extends SequelizeBaseSchema<Product> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id: CreationOptional<number>;

  @Column({
    type: DataTypes.CHAR(64),
  })
  name?: string;

  @Column({
    type: DataTypes.TEXT(),
  })
  description: string;

  @Column({
    type: DataTypes.CHAR(64),
  })
  image?: string;

  @Column({
    type: DataTypes.DECIMAL,
  })
  price: number;

  @HasMany(() => ProductCategoryAssociation, {
    sourceKey: 'id',
    foreignKey: 'product_id',
  })
  productCategoryAssociations?: NonAttribute<ProductCategoryAssociation[]>;
}
