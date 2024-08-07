import { BaseEntity } from '../base.entity';

export class Product extends BaseEntity {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  categoryIds: number[];
}
