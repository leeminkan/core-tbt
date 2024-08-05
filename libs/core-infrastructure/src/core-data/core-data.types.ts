import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type CoreDataOption = {
  typeOrmOptions: TypeOrmModuleOptions;
};

export type CoreDataAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<CoreDataOption>, 'useFactory' | 'inject'>;

export const CORE_DATA_OPTIONS = Symbol('CORE_DATA_OPTIONS');
