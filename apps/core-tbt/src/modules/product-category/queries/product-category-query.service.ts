import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductCategory } from '@libs/core-domain';
import { ProductCategoryRepository } from '@libs/core-infrastructure';

import { GetListProductCategoryDto } from '../dtos';

@Injectable()
export class ProductCategoryQueryService {
  constructor(private readonly productRepository: ProductCategoryRepository) {}

  async findAllAndCount(
    args: Omit<GetListProductCategoryDto, 'page' | 'pageSize'> & {
      take: number;
      skip: number;
    },
  ): Promise<{
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

  async findChildren(
    parentId: number,
    args: Pick<GetListProductCategoryDto, 'sort'>,
  ): Promise<ProductCategory[]> {
    const product = await this.productRepository.findById(parentId);

    if (!product) {
      throw new NotFoundException(
        `ProductCategory with ID ${parentId} not found`,
      );
    }

    return await this.productRepository.findChildren(parentId, args);
  }
}
