import { BaseEntity } from '../base.entity';

export class Session extends BaseEntity {
  id: string;
  userId: number;
  hash: string;
  isLogout: boolean;
}
