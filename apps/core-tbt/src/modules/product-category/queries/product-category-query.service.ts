import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductCategoryRepository } from '@libs/core-infrastructure';
import { ProductCategory } from '@libs/core-domain';

@Injectable()
export class ProductCategoryQueryService {
  constructor(private readonly productRepository: ProductCategoryRepository) {}

  async findAllAndCount(args: {
    search?: string;
    fromPrice?: number;
    toPrice?: number;
    take?: number;
    skip?: number;
  }): Promise<{
    data: ProductCategory[];
    totalCount: number;
  }> {
    return await this.productRepository.findAllAndCount({ ...args });
  }

  async findOne(id: number): Promise<ProductCategory> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`ProductCategory with ID ${id} not found`);
    }

    return product;
  }
}
