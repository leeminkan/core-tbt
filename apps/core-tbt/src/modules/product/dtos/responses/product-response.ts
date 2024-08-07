import { Product, ProductCategory } from '@libs/core-domain';

export class ProductResponse extends Product {
  categories: ProductCategory[];
}
