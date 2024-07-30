import { EntityManager } from 'typeorm';

// TypeORM, manager is EntityManager
// Sequelize, manager is Sequelize
// export type UnitOfWorkManager = EntityManager | Sequelize;
export type UnitOfWorkManager = EntityManager;

export abstract class UnitOfWork {
  abstract runInTransaction<R>(
    fn: (manager: UnitOfWorkManager) => Promise<R>,
  ): Promise<R>;
}
