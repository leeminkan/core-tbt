import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UnitOfWork } from '../uow.abstract';

class TypeOrmTransaction implements UnitOfWork {
  constructor(private manager: EntityManager) {
    this.manager = this.manager;
  }

  async runInTransaction<T>(
    fn: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return await this.manager.transaction(async (manager) => {
      this.manager = manager;
      const res = await fn(manager);
      this.manager = null;
      return res;
    });
  }
}

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
    const transaction = new TypeOrmTransaction(this.manager);
    return await transaction.runInTransaction(fn);
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
