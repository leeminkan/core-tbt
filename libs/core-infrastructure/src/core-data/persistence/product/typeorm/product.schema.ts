import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TypeormBaseSchema } from '@libs/core-infrastructure/core-data/typeorm-base.schema';

import { ProductCategoryAssociation } from './product-category-association.schema';

@Entity({
  name: 'products',
})
export class Product extends TypeormBaseSchema {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 64 })
  image: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @OneToMany(() => ProductCategoryAssociation, (postTag) => postTag.product)
  productCategoryAssociations: ProductCategoryAssociation[];
}
