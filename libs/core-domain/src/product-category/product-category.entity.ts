import { BaseEntity } from '../base.entity';

export class ProductCategory extends BaseEntity {
  id: number;
  name: string;
  description: string;
  parentId: number;
}
