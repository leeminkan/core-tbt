import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TypeormBaseSchema } from '@libs/core-infrastructure/core-data/typeorm-base.schema';

import { Session } from '../../session/typeorm/session.schema';

@Entity({
  name: 'users',
})
export class User extends TypeormBaseSchema {
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
