import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TypeormBaseSchema } from '@libs/core-infrastructure/core-data/typeorm-base.schema';

import { User as UserSchema } from '../../user/typeorm';

@Entity({
  name: 'sessions',
})
export class Session extends TypeormBaseSchema {
  @PrimaryGeneratedColumn('uuid') // UUID primary key
  id: string;

  @Column({ nullable: false })
  user_id: number;

  @ManyToOne(() => UserSchema, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: UserSchema;

  @Column({ nullable: false, length: '32' })
  hash: string;

  @Column({ default: false })
  is_logout: boolean;
}
