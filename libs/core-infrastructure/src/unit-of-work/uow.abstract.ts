import { Transaction } from 'sequelize';
import { EntityManager } from 'typeorm';

// TypeORM, manager is EntityManager
// Sequelize, manager is Sequelize
// export type UnitOfWorkManager = EntityManager | Sequelize;
export type UnitOfWorkManager = EntityManager | Transaction;

export abstract class UnitOfWork {
  abstract runInTransaction<R>(
    fn: (manager: UnitOfWorkManager) => Promise<R>,
  ): Promise<R>;

  abstract runInTransactionWithRetry<R>(
    fn: (manager: UnitOfWorkManager) => Promise<R>,
    maxRetries?: number,
    retryDelay?: number,
  ): Promise<R>;
}
