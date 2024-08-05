import { plainToInstance } from 'class-transformer';
import { ProductCategory as ProductCategoryDomainEntity } from '@libs/core-domain';
import { BaseMapper } from '@libs/core-infrastructure/base-mapper.abstract';

import { ProductCategory as ProductCategoryInfrastructureSchema } from './product-category.schema';

export class ProductCategoryMapper
  implements
    BaseMapper<
      ProductCategoryDomainEntity,
      ProductCategoryInfrastructureSchema
    >
{
  mapToORM(
    domainEntity: ProductCategoryDomainEntity,
  ): ProductCategoryInfrastructureSchema {
    const orm = new ProductCategoryInfrastructureSchema();
    orm.id = domainEntity.id;
    orm.name = domainEntity.name;
    orm.description = domainEntity.description;
    orm.parent_id = domainEntity.parentId;
    return orm;
  }

  mapToDomain(
    infrastructureSchema: ProductCategoryInfrastructureSchema,
  ): ProductCategoryDomainEntity {
    return plainToInstance(ProductCategoryDomainEntity, {
      id: infrastructureSchema.id,
      name: infrastructureSchema.name,
      description: infrastructureSchema.description,
      parentId: infrastructureSchema.parent_id,
    });
  }
}
