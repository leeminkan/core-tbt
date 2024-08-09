import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import {
  ExceedRetryTransactionError,
  VersionMismatchError,
} from '@libs/core-infrastructure/base.errors';

import { UnitOfWork } from '../uow.abstract';

export class TypeOrmUnitOfWork implements UnitOfWork {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
  ) {
    this.manager = this.manager;
  }

  async runInTransaction<T>(
    fn: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return await this.manager.transaction(fn);
  }

  async runInTransactionWithRetry<T>(
    fn: (manager: EntityManager) => Promise<T>,
    maxRetries = 3,
    retryDelay = 0,
  ): Promise<T> {
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        return await this.manager.transaction(fn);
      } catch (error) {
        const isRetryableError = error instanceof VersionMismatchError;
        if (!isRetryableError) {
          throw error;
        }
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    throw new ExceedRetryTransactionError();
  }
}

// class SequelizeTransaction implements UnitOfWork {
//   constructor(private manager: EntityManager) {
//     this.manager = this.manager;
//   }

//   async runInTransaction<T>(
//     fn: (sequelize: Sequelize) => Promise<T>,
//   ): Promise<T> {
//     return await this.sequelize.transaction(async (tx) => {
//       return await fn(tx);
//     });
//   }
// }
