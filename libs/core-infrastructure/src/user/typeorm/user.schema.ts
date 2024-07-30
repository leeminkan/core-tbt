import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseSchema } from '../../base.schema';
import { Session } from '../../session/typeorm/session.schema';

@Entity({
  name: 'users',
})
export class User extends BaseSchema {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  username: string;

  @Column({ type: 'varchar', length: 256 })
  password: string;

  @OneToMany(() => Session, (session) => session.user, { cascade: true })
  sessions: Session[];
}
