import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { ProductCategory } from '@libs/core-infrastructure/core-data/persistence/product-category/typeorm';
import { TypeormBaseSchema } from '@libs/core-infrastructure/core-data/typeorm-base.schema';

import { Product } from './product.schema';

@Entity({
  name: 'product_category_associations',
})
export class ProductCategoryAssociation extends TypeormBaseSchema {
  @PrimaryColumn()
  product_id: number;

  @PrimaryColumn()
  category_id: number;

  @ManyToOne(() => Product, (product) => product.productCategoryAssociations)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(
    () => ProductCategory,
    (category) => category.productCategoryAssociations,
  )
  @JoinColumn({ name: 'category_id' })
  categories: ProductCategory;
}
