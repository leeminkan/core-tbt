import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type CoreInfrastructureOption = {
  typeOrmOptions: TypeOrmModuleOptions;
};

export type CoreInfrastructureAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<CoreInfrastructureOption>, 'useFactory' | 'inject'>;

export const CORE_INFRASTRUCTURE_OPTIONS = Symbol(
  'CORE_INFRASTRUCTURE_OPTIONS',
);
