import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '@libs/core-domain';
import { ProductRepository } from '@libs/core-infrastructure';

@Injectable()
export class ProductQueryService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAllAndCount(args: {
    search?: string;
    fromPrice?: number;
    toPrice?: number;
    take?: number;
    skip?: number;
  }): Promise<{
    data: Product[];
    totalCount: number;
  }> {
    return await this.productRepository.findAllAndCount({ ...args });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
}
