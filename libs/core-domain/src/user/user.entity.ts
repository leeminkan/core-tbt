import { Exclude } from 'class-transformer';
import { BaseEntity } from '../base.entity';

export class User extends BaseEntity {
  id: number;
  username: string;

  @Exclude({ toPlainOnly: true })
  password: string;
}
