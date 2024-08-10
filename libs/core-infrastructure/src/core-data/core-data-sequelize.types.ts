import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export type CoreDataSequelizeOption = {
  sequelizeOptions: SequelizeModuleOptions;
};

export type CoreDataSequelizeAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<CoreDataSequelizeOption>, 'useFactory' | 'inject'>;
