import { InjectConnection } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import {
  ExceedRetryTransactionError,
  VersionMismatchError,
} from '@libs/core-infrastructure/base.errors';

import { UnitOfWork } from '../uow.abstract';

export class SequelizeUnitOfWork implements UnitOfWork {
  constructor(
    @InjectConnection()
    private readonly connection: Sequelize,
  ) {}

  async runInTransaction<T>(
    fn: (manager: Transaction) => Promise<T>,
  ): Promise<T> {
    return await this.connection.transaction(fn);
  }

  async runInTransactionWithRetry<T>(
    fn: (manager: Transaction) => Promise<T>,
    maxRetries = 3,
    retryDelay = 0,
  ): Promise<T> {
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        return await this.connection.transaction(fn);
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
