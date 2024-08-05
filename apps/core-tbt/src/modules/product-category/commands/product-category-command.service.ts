import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ProductCategoryRepository } from '@libs/core-infrastructure';
import { ProductCategory } from '@libs/core-domain';

import { CreateProductCategoryDto, UpdateProductCategoryDto } from '../dtos';

@Injectable()
export class ProductCategoryCommandService {
  constructor(private readonly productRepository: ProductCategoryRepository) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    if (createProductCategoryDto.parentId) {
      const parent = await this.productRepository.findById(
        createProductCategoryDto.parentId,
      );

      if (!parent) {
        throw new NotFoundException('Parent category does not exist!');
      }

      if (parent.parentId) {
        throw new BadRequestException('Parent should be root category!');
      }
    }

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
