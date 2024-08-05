import { Injectable } from '@nestjs/common';

import { ProductCategoryRepository } from '@libs/core-infrastructure';
import { ProductCategory } from '@libs/core-domain';

import { CreateProductCategoryDto, UpdateProductCategoryDto } from '../dtos';

@Injectable()
export class ProductCategoryCommandService {
  constructor(private readonly productRepository: ProductCategoryRepository) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    const product = await this.productRepository.create({
      ...createProductCategoryDto,
    });
    return product;
  }

  async update(
    id: number,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    await this.productRepository.findAndUpdateById(
      id,
      updateProductCategoryDto,
    );
    return await this.productRepository.findById(id, {
      throwNotFoundError: true,
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.productRepository.deleteById(id);
  }

  async deleteByIds(ids: number[]): Promise<void> {
    await this.productRepository.deleteByIds(ids);
  }
}
