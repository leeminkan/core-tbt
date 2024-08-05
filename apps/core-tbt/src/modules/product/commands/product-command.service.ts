import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@libs/core-infrastructure';
import { Product } from '@libs/core-domain';

import { CreateProductDto, UpdateProductDto } from '../dtos';

@Injectable()
export class ProductCommandService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create({
      ...createProductDto,
    });
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.findAndUpdateById(id, updateProductDto);
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
