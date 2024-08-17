import { BaseEntity } from '../base.entity';
import { AuthProvider } from './session.constant';
import { SessionProperties } from './session.type';

export class Session extends BaseEntity {
  id: string;
  userId: number;
  hash: string;
  isLogout: boolean;
  authProvider: AuthProvider;
  properties: SessionProperties;
}
