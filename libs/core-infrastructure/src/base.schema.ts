import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseSchema {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
