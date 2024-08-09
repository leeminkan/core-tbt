import { plainToInstance } from 'class-transformer';

import { Product as ProductDomainEntity } from '@libs/core-domain';
import { BaseMapper } from '@libs/core-infrastructure/base-mapper.abstract';

import { Product as ProductInfrastructureSchema } from './product.schema';

export class ProductMapper
  implements BaseMapper<ProductDomainEntity, ProductInfrastructureSchema>
{
  mapToORM(domainEntity: ProductDomainEntity): ProductInfrastructureSchema {
    const orm = new ProductInfrastructureSchema();
    orm.id = domainEntity.id;
    orm.name = domainEntity.name;
    orm.description = domainEntity.description;
    orm.image = domainEntity.image;
    orm.price = domainEntity.price;
    return orm;
  }

  mapToDomain(
    infrastructureSchema: ProductInfrastructureSchema,
    additionalFields?: {
      categoryIds: number[];
    },
  ): ProductDomainEntity {
    return plainToInstance(ProductDomainEntity, {
      id: infrastructureSchema.id,
      name: infrastructureSchema.name,
      description: infrastructureSchema.description,
      image: infrastructureSchema.image,
      price: infrastructureSchema.price,
      categoryIds: additionalFields?.categoryIds ?? [],
    });
  }
}
