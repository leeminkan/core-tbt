import { BaseEntity } from '../base.entity';

export class Customer extends BaseEntity {
  id: number;
  firstName: string;
  lastName: string;
}
