import { Injectable } from '@nestjs/common';

import { Product, ProductCategoryRepository } from '@libs/core-domain';

@Injectable()
export class ProductPopulateService {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async populateProductDetail(product: Product) {
    const categories = product.categoryIds?.length
      ? await this.productCategoryRepository.findAll({
          ids: product.categoryIds,
        })
      : [];

    return {
      ...product,
      categories,
    };
  }

  async populateProductList(products: Product[]) {
    const allCategoryIds = products.reduce((sum: number[], item) => {
      if (item.categoryIds.length) {
        sum.push(...item.categoryIds);
      }
      return sum;
    }, []);

    const allCategories = allCategoryIds?.length
      ? await this.productCategoryRepository.findAll({
          ids: allCategoryIds,
        })
      : [];

    const populatedProducts = products.map((product) => {
      const categories = product.categoryIds?.length
        ? allCategories.filter((item) => product.categoryIds.includes(item.id))
        : [];

      return {
        ...product,
        categories,
      };
    });

    console.log('allCategoryIds', {
      allCategoryIds,
      allCategories,
    });

    return populatedProducts;
  }
}
