import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TypeormBaseSchema } from '@libs/core-infrastructure/core-data/typeorm-base.schema';

import { ProductCategoryAssociation } from '../../product/typeorm';

@Entity({
  name: 'product_categories',
})
export class ProductCategory extends TypeormBaseSchema {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne(() => ProductCategory, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: ProductCategory;

  @OneToMany(() => ProductCategory, (category) => category.parent)
  children: ProductCategory[];

  @OneToMany(() => ProductCategoryAssociation, (postTag) => postTag.categories)
  productCategoryAssociations: ProductCategoryAssociation[];
}
